require 'net/https'
require 'net/http'
require "uri"
require "json"

def parseUsers(url)
  uri = URI.parse(url)

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE
  request = Net::HTTP::Get.new(uri.request_uri)
  request.basic_auth("twilkis", "twilkis99")
  request['Content-Type'] = 'application/json'
  response = http.request(request)

  body = JSON.parse(response.body)

  users = body["$resources"]

  users.each do |user|
    currUser = {
      "username" => user["UserName"],
      "userid" => user["$key"],
      "firstname" => user["UserInfo"]["FirstName"],
      "lastname" => user["UserInfo"]["LastName"]
    }
    url = 'http://localhost:9200/xtivia/user/' + currUser["userid"]
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Put.new(uri.request_uri)
    request.body = currUser.to_json
    response = http.request(request)
    puts response.body
  end
end

def parseAccounts(url)
  uri = URI.parse(url)

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE
  request = Net::HTTP::Get.new(uri.request_uri)
  request.basic_auth("twilkis", "twilkis99")
  request['Content-Type'] = 'application/json'
  response = http.request(request)

  body = JSON.parse(response.body)

  accounts = body["$resources"]
  accounts.each do |user|
    currAccount = {
      "accountid" => user["$key"],
      "accountname" => user["AccountName"],
      "notes" => user["Notes"],
      "address" => {
        "addressid" => user["Address"]["$key"],
        "streetaddress" => user["Address"]["Address1"],
        "city" => user["Address"]["City"],
        "state" => user["Address"]["State"],
        "zip" => user["Address"]["PostalCode"]
      }
    }
    url = 'http://localhost:9200/xtivia/account/' + currAccount["accountid"]
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Put.new(uri.request_uri)
    request.body = currAccount.to_json
    response = http.request(request)
    puts response.body
  end

  if(!body["$next"].nil? && !body["$next"].empty?)
    parseAccounts(body["$next"])
  end
end

def parseTickets(url)
  uri = URI.parse(url)

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE
  request = Net::HTTP::Get.new(uri.request_uri)
  request.basic_auth("twilkis", "twilkis99")
  request['Content-Type'] = 'application/json'
  response = http.request(request)

  body = JSON.parse(response.body)

  tickets = body["$resources"]
  tickets.each do |user|
    currAccount = {
      "ticketid" => user["$key"],
      "ticketproblem" => user["TicketProblem"]["Notes"],
      "ticketsolution" => user["TicketSolution"]["Notes"],
      "subject" => user["Subject"],
      "account" => {
        "accountid" => user["Account"]["$key"],
        "accountname" => user["Account"]["AccountName"]
      },
      "assignedto" => {
        "userid" => user["AssignedTo"]["$key"],
        "username" => user["AssignedTo"]["UserName"]
      }
    }
    url = 'http://localhost:9200/xtivia/ticket/' + currAccount["ticketid"]
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Put.new(uri.request_uri)
    request.body = currAccount.to_json
    response = http.request(request)
    puts response.body
  end

  if(!body["$next"].nil? && !body["$next"].empty?)
    parseTickets(body["$next"])
  end
end

parseUsers('https://slxweb.sssworld.com/sdata/slx/dynamic/-/users?format=json&include=UserInfo&select=UserName,$key,UserInfo/FirstName,UserInfo/LastName')
parseAccounts('https://slxweb.sssworld.com/sdata/slx/dynamic/-/accounts?include=Address&select=accountid,accountname,Notes,Address\Address1,Address\State,Address\City,Address\PostalCode&format=json&count=500')
parseTickets('https://slxweb.sssworld.com/sdata/slx/dynamic/-/tickets?include=TicketSolution,TicketProblem,AssignTo,Account&select=subject,ticketid,TicketSolution\notes,TicketProblem\notes,CreateDate,NeededByDate,ReceivedDate,Account\AccountName,AssignedTo\User\UserName&count=1000&format=json')
