require 'net/https'
require 'net/http'
require "uri"
require "json"
require 'date'

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
      "lastname" => user["UserInfo"]["LastName"],
      "slxcreatedate" => Time.at(/(\d+)/.match(user["CreateDate"])[0].to_i/1000).to_datetime,
      "slxupdatedate" => Time.at(/(\d+)/.match(user["$updated"])[0].to_i/1000).to_datetime,
      "createdate" => Time.now.to_datetime,
      "updatedate" => Time.now.to_datetime
    }
    puts currUser.to_json
    url = 'http://api.twilkislinux.sssworld-local.com/user'
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri)
    request['Content-Type'] = 'Application/Json'
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
      },
      "slxcreatedate" => Time.at(/(\d+)/.match(user["CreateDate"])[0].to_i/1000).to_datetime,
      "slxupdatedate" => Time.at(/(\d+)/.match(user["$updated"])[0].to_i/1000).to_datetime,
      "createdate" => Time.now.to_datetime,
      "updatedate" => Time.now.to_datetime
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
    if(user["NeededByDate"])
      neededbydate = Time.at(/(\d+)/.match(user["NeededByDate"])[0].to_i/1000).to_datetime
    else
      neededbydate = nil
    end
    if(user["ReceivedDate"])
      receiveddate = Time.at(/(\d+)/.match(user["ReceivedDate"])[0].to_i/1000).to_datetime
    else
      receiveddate = nil
    end

    if(user["AssignedTo"]["User"])
      username = user["AssignedTo"]["User"]["UserName"]
      userid = user["AssignedTo"]["User"]["$key"]
    else
      username = nil
      userid = nil
    end

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
        "userid" => userid,
        "username" => username
      },
      "neededbydate" => neededbydate,
      "receiveddate" => receiveddate,
      "slxcreatedate" => Time.at(/(\d+)/.match(user["CreateDate"])[0].to_i/1000).to_datetime,
      "slxupdatedate" => Time.at(/(\d+)/.match(user["$updated"])[0].to_i/1000).to_datetime,
      "createdate" => Time.now.to_datetime,
      "updatedate" => Time.now.to_datetime
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

#parseUsers('https://slxweb.sssworld.com/sdata/slx/dynamic/-/users?format=json&include=UserInfo&select=UserName,$key,UserInfo/FirstName,UserInfo/LastName,Createdate')
parseAccounts('https://slxweb.sssworld.com/sdata/slx/dynamic/-/accounts?include=Address&select=accountid,accountname,Notes,Address\Address1,Address\State,Address\City,Address\PostalCode,Createdate&format=json&count=500')
parseTickets('https://slxweb.sssworld.com/sdata/slx/dynamic/-/tickets?include=TicketSolution,TicketProblem,AssignTo,Account&select=subject,ticketid,TicketSolution\notes,TicketProblem\notes,CreateDate,NeededByDate,ReceivedDate,Account\AccountName,AssignedTo\User\UserName&count=1000&format=json')
