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
    uri = URI.parse("https://slxweb.sssworld.com/sdata/slx/dynamic/-/tickets('" + params["ticketid"] + "')?format=json")
    query = {
      "$key" => params["ticketid"],
      "TicketProblem" => {
        "$key" => params["ticketid"],
        "Notes" => params["ticketproblem"]
      },
      "TicketSolution" => {
        "$key" => params["ticketid"],
        "Notes" => params["ticketsolution"]
      },
      "Subject" => params["subject"]
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
        "ticketproblem" => params["ticketproblem"],
        "ticketsolution" => params["ticketsolution"],
        "subject" => params["subject"],
        "userid" => params["userid"],
        "updatedate" => Time.now.to_datetime,
        "slxupdatedate" => Time.now.to_datetime
      }
    }
    url = "http://localhost:9200/xtivia/ticket/" + params["ticketid"] + "/_update"
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
