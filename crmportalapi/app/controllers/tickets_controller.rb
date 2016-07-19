require 'net/http'
require "uri"
require "json"

class TicketsController < ApplicationController
  def index
    url = "http://localhost:9200/xtivia/ticket/_search/?size=100"
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)

    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)

    response.headers['Access-Control-Allow-Origin'] = 'http://twilkislinux.sssworld-local.com'
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

    response.headers['Access-Control-Allow-Origin'] = 'http://twilkislinux.sssworld-local.com'
    render json: body
  end

  def update
  end

  def destroy
  end

  def search
    url = "http://localhost:9200/xtivia/ticket/_search/?q=" + params["query"]
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)

    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)

    response.headers['Access-Control-Allow-Origin'] = 'http://twilkislinux.sssworld-local.com'
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
      }
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

    response.headers['Access-Control-Allow-Origin'] = 'http://twilkislinux.sssworld-local.com'
    render json: body
  end
end
