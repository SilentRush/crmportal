require 'net/http'
require "uri"
require "json"

class HistoriesController < ApplicationController
  def index
    url = "http://localhost:9200/xtivia/history/_search/?size=" + params["size"] + "&from=" + params["from"] + "&sort=slxcreatedate:desc"
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)

    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)

    render json: body
  end

  def create

  end

  def show
    url = "http://localhost:9200/xtivia/history/" + params["id"]
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)

    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)

    render json: body
  end

  def update
    uri = URI.parse("https://slxweb.sssworld.com/sdata/slx/dynamic/-/history('" + params["historyid"] + "')?format=json")
    query = {
      "$key" => params["historyid"],
      "LongNotes" => params["longnotes"]
    }
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request = Net::HTTP::Put.new(uri.request_uri)
    request['Authorization'] = params["saleslogixAuth"]
    request['Content-Type'] = 'application/json'
    request.body = query.to_json
    response = http.request(request)

    query = {
      "doc" => {
        "longnotes" => params["longnotes"],
        "userid" => params["userid"],
        "updatedate" => Time.now.to_datetime,
        "slxupdatedate" => Time.now.to_datetime
      }
    }
    url = "http://localhost:9200/xtivia/history/" + params["historyid"] + "/_update"
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = query.to_json
    request['Content-Type'] = 'application/json'
    response = http.request(request)

    body = JSON.parse(response.body)
  end

  def destroy
  end

  def search
    must = []
    if(!params["account"].nil?)
      account = {"match"=>{"accountname"=>"#{params["account"]}"}}
      must.push(account)
    end
    if(!params["contact"].nil?)
      contact = {"match"=>{"contactname"=>"#{params["contact"]}"}}
      must.push(contact)
    end
    if(!params["value"].nil? && !params["value"].strip.empty?)
      query = {
        "query" => {
          "bool" => {
              "should" =>[
                {
                  "multi_match":{
                    "query" => "#{params["value"]}",
                    "fields" => ["description","longnotes","contactname","accountname","username"]
                  }
                }
              ]
            }
        },
        "highlight" => {
          "pre_tags" => [
            "<em>"
          ],
          "post_tags" => [
            "</em>"
          ],
          "fields" => {
              "description":{"number_of_fragments":0},
              "longnotes":{"number_of_fragments":0},
              "contactname":{"number_of_fragments":0},
              "accountname":{"number_of_fragments":0},
              "username":{"number_of_fragments":0}
          }
        },
        "sort" => [
          "_score"
        ]
      }

      if(must.length > 0)
        query["query"]["bool"]["must"] = must
      end
    elsif((!params["account"].nil? && !params["account"].strip.empty?) || (!params["contact"].nil? && !params["contact"].strip.empty?))
      query = {
        "query" => {
            "bool" => {

            }
        },
        "highlight" => {
          "pre_tags" => [
            "<em>"
          ],
          "post_tags" => [
            "</em>"
          ],
          "fields" => {
              "description":{"number_of_fragments":0},
              "longnotes":{"number_of_fragments":0},
              "contactname":{"number_of_fragments":0},
              "accountname":{"number_of_fragments":0},
              "username":{"number_of_fragments":0}
          }
        },
        "sort" => [
          "_score"
        ]
      }
      if(must.length > 0)
        query["query"]["bool"]["must"] = must
      end
    else
      query = {
        "query" => {
          "match_all" => {}
        }
      }
    end
    if(!params["size"].nil?)
      query["size"] = params["size"]
    end

    if(!params["from"].nil?)
      query["from"] = params["from"]
    end

    url = "http://localhost:9200/xtivia/history/_search"
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = query.to_json
    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)

    render json: body
  end


end
