require 'net/http'
require "uri"
require "json"

class CommentsController < ApplicationController
  def index
    url = "http://localhost:9200/xtivia/comment/_search/?size=" + params["size"] + "&from=" + params["from"] + "&sort=createdate:asc"
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)

    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)

    render json: body
  end

  def entityComment
    query = {
      "query" => {
        "bool" => {
          "must" => [
            {
              "match":{
                "entityid" => "#{params["entityid"]}"
              }
            },
            {
              "match":{
                "type" => "#{params["type"]}"
              }
            }
          ]
        }
      },
      "sort":[
        {"createdate" => {"order"=>"asc"}}
      ]
    }
    if(!params["size"].nil?)
      query["size"] = params["size"]
    end

    if(!params["from"].nil?)
      query["from"] = params["from"]
    end

    url = "http://localhost:9200/xtivia/comment/_search"
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = query.to_json
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
      "createdate" => Time.now.to_datetime,
      "updatedate" => Time.now.to_datetime
    }
    url = "http://localhost:9200/xtivia/comment"
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = query.to_json
    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)


    url = "http://localhost:9200/xtivia/comment/" + body["_id"]
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)

    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)

    render json: body
  end

  def show
    url = "http://localhost:9200/xtivia/comment/" + params["id"]
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)

    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)

    render json: body
  end

  def update
  end

  def destroy
  end

  def search
    query = {
      "query" => {
        "bool" => {
          "should" => [
            {
              "match":{
                "account.accountname" => "#{params["value"]}"
              }
            },
            {
              "match":{
                "commentproblem" => "#{params["value"]}"
              }
            },
            {
              "match":{
                "commentsolution" => "#{params["value"]}"
              }
            },
            {
              "match":{
                "assignedto.username" => "#{params["value"]}"
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

    url = "http://localhost:9200/xtivia/comment/_search"
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
