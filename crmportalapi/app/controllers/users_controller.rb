require 'net/http'
require "uri"
require "json"

class UsersController < ApplicationController
  skip_before_action :require_login, only: [:authenticateUser, :create, :show]

  include ActionController::Cookies
  def authenticateUser
    url = "https://slxweb.sssworld.com/sdata/slx/dynamic/-/users?format=json&where=UserName eq '#{params["username"]}'"
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)
    http.use_ssl = true
    http.verify_mode = OpenSSL::SSL::VERIFY_NONE
    request['Authorization'] = params["authToken"]

    request['Content-Type'] = 'application/json'
    res = http.request(request)
    if(res.kind_of? Net::HTTPSuccess)
      body = JSON.parse(res.body)
      if(body["$resources"].length > 0)
        url = "http://localhost:9200/xtivia/user/" + body["$resources"].first["$key"]
        uri = URI.parse(url)

        http = Net::HTTP.new(uri.host, uri.port)
        request = Net::HTTP::Get.new(uri.request_uri)

        request['Content-Type'] = 'application/json'
        res = http.request(request)

        body = JSON.parse(res.body)
        render json: body
      end
    else
      render json: {"error"=>"Fail"}, status: 401
    end

  end

  def logout
  end

  def create
    user = params["user"]
    user["token"] = SecureRandom.base64(64)
    url = 'http://localhost:9200/xtivia/user/' + user["userid"].to_s + "/_update"
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Put.new(uri.request_uri)
    request.body = user.to_json
    response = http.request(request)
    render json: response.body
  end

  def show
    url = "http://localhost:9200/xtivia/user/" + params["id"]
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)

    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)
    body["_source"].delete("token")
    render json: body
  end

  def index
    url = "http://localhost:9200/xtivia/user/_search/?size=" + params["size"] + "&from=" + params["from"]
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
                "accountname" => "#{params["value"]}"
              }
            },
            {
              "match":{
                "notes" => "#{params["value"]}"
              }
            }
          ]
        }
      },
      "sort":[
        {"slxupdatedate" => {"order"=>"desc"}},
        "_score"
      ],
    }

    if(!params["size"].nil?)
      query["size"] = params["size"]
    end

    if(!params["from"].nil?)
      query["from"] = params["from"]
    end

    url = "http://localhost:9200/xtivia/account/_search"
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
