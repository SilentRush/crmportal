require 'net/http'
require "uri"
require "json"

class BlogsController < ApplicationController
  def index
    url = "http://localhost:9200/xtivia/blog/_search/?size=" + params["size"] + "&from=" + params["from"] + "&sort=createdate:asc"
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)

    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)

    render json: body
  end

  def create
    query = {
      "rawbody" => params["rawbody"],
      "entityid" => params["entityid"],
      "type" => params["type"],
      "userid" => params["userid"],
      "createdate" => Time.now.to_datetime,
      "updatedate" => Time.now.to_datetime
    }
    url = "http://localhost:9200/xtivia/blog"
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = query.to_json
    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)


    url = "http://localhost:9200/xtivia/blog/" + body["_id"]
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)

    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)

    render json: body
  end

  def show
    url = "http://localhost:9200/xtivia/blog/" + params["id"]
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)

    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)

    render json: body
  end

  def update
    query = {
      "doc" => {
        "rawbody" => params["rawbody"],
        "userid" => params["userid"],
        "updatedate" => Time.now.to_datetime
      }
    }
    url = "http://localhost:9200/xtivia/blog/" + params["blogid"] + "/_update"
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = query.to_json
    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)
  end

  def destroy
    url = "http://localhost:9200/xtivia/blog/" + params["id"]
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Delete.new(uri.request_uri)

    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)

    render json: body
  end

  def search
    query = {
      "query" => {
        "bool" => {
          "should" => [
            {
              "match":{
                "blog" => "#{params["value"]}"
              }
            }
          ]
        }
      },
      "sort":[
        "_score",
        {"updatedate" => {"order"=>"desc"}}
      ]
    }

    if(!params["size"].nil?)
      query["size"] = params["size"]
    end

    if(!params["from"].nil?)
      query["from"] = params["from"]
    end

    url = "http://localhost:9200/xtivia/blog/_search"
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
