require 'net/http'
require "uri"
require "json"

class ContactsController < ApplicationController
  def index
    url = "http://localhost:9200/xtivia/contact/_search/?size=" + params["size"] + "&from=" + params["from"] + "&sort=slxcreatedate:asc"
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
    url = "http://localhost:9200/xtivia/contact/" + params["id"]
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)

    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)

    render json: body
  end

  def getContactNames
    query = {
      "_source"=> false,
      "aggs" => {
        "contactnames" => {
          "terms" =>
            {
              "field"=>"contactname.raw",
              "size"=> 0
            }
        }
      }
    }

    url = "http://localhost:9200/xtivia/contact/_search"
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = query.to_json
    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)

    render json: body
  end

  def update
    uri = URI.parse("https://slxweb.sssworld.com/sdata/slx/dynamic/-/contacts('" + params["contactid"] + "')?format=json")
    query = {
      "$key" => params["contactid"],
      "ContactName" => params["contactname"],
      "Notes" => params["notes"]
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
        "contactname" => params["contactname"],
        "notes" => params["notes"],
        "userid" => params["userid"],
        "updatedate" => Time.now.to_datetime,
        "slxupdatedate" => Time.now.to_datetime
      }
    }
    url = "http://localhost:9200/xtivia/contact/" + params["contactid"] + "/_update"
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
    query = {
      "query" => {
        "bool" => {
          "should" => [
            {
              "multi_match":{
                "query" => "#{params["value"]}",
                "fields" => ["contactname","accountname"]
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
            "contactname":{"number_of_fragments":0},
            "accountname":{"number_of_fragments":0}
        }
      },
      "sort":[
        "_score"
      ]
    }

    if(!params["size"].nil?)
      query["size"] = params["size"]
    end

    if(!params["from"].nil?)
      query["from"] = params["from"]
    end

    url = "http://localhost:9200/xtivia/contact/_search"
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
