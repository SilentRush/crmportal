require 'net/http'
require "uri"
require "json"

class TicketsController < ApplicationController
  def index
    url = "http://localhost:9200/xtivia/ticket/_search/?size=" + params["size"] + "&from=" + params["from"] + "&sort=slxupdatedate:desc"
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
    url = "http://localhost:9200/xtivia/ticket/" + params["id"]
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
                "ticketproblem" => "#{params["value"]}"
              }
            },
            {
              "match":{
                "ticketsolution" => "#{params["value"]}"
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
        {"slxupdatedate" => {"order"=>"desc"}}
      ]
    }

    if(!params["size"].nil?)
      query["size"] = params["size"]
    end

    if(!params["from"].nil?)
      query["from"] = params["from"]
    end

    url = "http://localhost:9200/xtivia/ticket/_search"
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = query.to_json
    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)

    render json: body
  end

  def getAccountTickets
    query = {
      "query" => {
        "bool" => {
          "must" => [
            "match":{
              "account.accountid" => "#{params["accountid"]}"
            }
          ]
        }
      },
      "sort":[
        {"slxupdatedate" => {"order"=>"desc"}}
      ]
    }
    if(!params["size"].nil?)
      query["size"] = params["size"]
    end

    if(!params["from"].nil?)
      query["from"] = params["from"]
    end

    url = "http://localhost:9200/xtivia/ticket/_search"
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
