require "net/https"
require "net/http"
require "uri"
require "json"
require "date"
require "time"

def parseUsers(url)
  uri = URI.parse(url)

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE
  request = Net::HTTP::Get.new(uri.request_uri)
  request.basic_auth("twilkis", "twilkis99")
  request["Content-Type"] = "application/json"
  response = http.request(request)

  body = JSON.parse(response.body)

  users = body["$resources"]

  users.each do |user|
    currUser = {
      "doc" => {
        "username" => user["UserName"],
        "userid" => user["$key"],
        "firstname" => user["UserInfo"]["FirstName"],
        "lastname" => user["UserInfo"]["LastName"],
        "slxcreatedate" => Time.at(/(\d+)/.match(user["CreateDate"])[0].to_i/1000).to_datetime,
        "slxupdatedate" => Time.at(/(\d+)/.match(user["$updated"])[0].to_i/1000).to_datetime,
        "createdate" => Time.now.to_datetime,
        "updatedate" => Time.now.to_datetime
      },
      "doc_as_upsert" => true
    }
    puts currUser.to_json
    url = "http://api.twilkislinux.sssworld-local.com/user/"
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri)
    request["Content-Type"] = "Application/Json"
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
  request["Content-Type"] = "application/json"
  response = http.request(request)

  body = JSON.parse(response.body)

  accounts = body["$resources"]
  accounts.each do |user|
    currAccount = {
      "doc" => {
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
      },
      "doc_as_upsert" => true
    }
    url = "http://localhost:9200/xtivia/account/" + user["$key"].to_s + "/_update"
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = currAccount.to_json
    response = http.request(request)
    puts response.body
  end

  if(!body["$next"].nil? && !body["$next"].empty?)
    parseAccounts(body["$next"])
  end
end

def parseContacts(url)
  uri = URI.parse(url)

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE
  request = Net::HTTP::Get.new(uri.request_uri)
  request.basic_auth("twilkis", "twilkis99")
  request["Content-Type"] = "application/json"
  response = http.request(request)

  body = JSON.parse(response.body)

  contacts = body["$resources"]
  contacts.each do |contact|
    currContact = {
      "doc" => {
        "contactid" => contact["$key"],
        "accountid" => contact["Account"]["$key"],
        "accountname" => contact["Account"]["AccountName"],
        "contactname" => contact["NameLF"],
        "firstname" => contact["FirstName"],
        "lastname" => contact["LastName"],
        "fullname" => contact["Name"],
        "slxcreatedate" => Time.at(/(\d+)/.match(contact["CreateDate"])[0].to_i/1000).to_datetime,
        "slxupdatedate" => Time.at(/(\d+)/.match(contact["$updated"])[0].to_i/1000).to_datetime,
        "createdate" => Time.now.to_datetime,
        "updatedate" => Time.now.to_datetime
      },
      "doc_as_upsert" => true
    }
    url = "http://localhost:9200/xtivia/contact/" + contact["$key"].to_s + "/_update"
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = currContact.to_json
    response = http.request(request)
    puts response.body
  end

  if(!body["$next"].nil? && !body["$next"].empty?)
    parseContacts(body["$next"])
  end
end

def parseTickets(url)
  uri = URI.parse(url)

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE
  request = Net::HTTP::Get.new(uri.request_uri)
  request.basic_auth("twilkis", "twilkis99")
  request["Content-Type"] = "application/json"
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

    currTicket = {
      "doc" => {
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
      },
      "doc_as_upsert" => true
    }
    url = "http://localhost:9200/xtivia/ticket/" + user["$key"].to_s + "/_update"
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = currTicket.to_json
    response = http.request(request)
    puts response.body
  end

  if(!body["$next"].nil? && !body["$next"].empty?)
    parseTickets(body["$next"])
  end
end

def parseHistory(url)
  uri = URI.parse(url)

  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE
  request = Net::HTTP::Get.new(uri.request_uri)
  request.basic_auth("twilkis", "twilkis99")
  request["Content-Type"] = "application/json"
  response = http.request(request)

  body = JSON.parse(response.body)

  histories = body["$resources"]
  histories.each do |history|

    currHistory = {
      "doc" => {
        "historyid" => history["$key"],
        "userid" => history["UserId"],
        "username" => history["UserName"],
        "type" => history["Type"],
        "notes" => history["Notes"],
        "longnotes" => history["LongNotes"],
        "description" => history["Description"],
        "descriptor" => history["$descriptor"],
        "contactname" => history["ContactName"],
        "contactid" => history["ContactId"],
        "accountname" => history["AccountName"],
        "accountid" => history["AccountId"],
        "startdate" => Time.at(/(\d+)/.match(history["StartDate"])[0].to_i/1000).to_datetime,
        "enddate" => Time.at(/(\d+)/.match(history["EndDate"])[0].to_i/1000).to_datetime,
        "slxcreatedate" => Time.at(/(\d+)/.match(history["CreateDate"])[0].to_i/1000).to_datetime,
        "slxupdatedate" => Time.at(/(\d+)/.match(history["ModifyDate"])[0].to_i/1000).to_datetime,
        "createdate" => Time.now.to_datetime,
        "updatedate" => Time.now.to_datetime
      },
      "doc_as_upsert" => true
    }
    url = "http://localhost:9200/xtivia/history/" + history["$key"].to_s + "/_update"
    uri = URI.parse(url)
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Post.new(uri.request_uri)
    request.body = currHistory.to_json
    response = http.request(request)
    puts response.body
  end

  if(!body["$next"].nil? && !body["$next"].empty?)
    parseHistory(body["$next"])
  end
end


#parseUsers("https://slxweb.sssworld.com/sdata/slx/dynamic/-/users?format=json&include=UserInfo&select=UserName,$key,UserInfo/FirstName,UserInfo/LastName,Createdate")
#parseHistory("https://slxweb.sssworld.com/sdata/slx/dynamic/-/history?format=json&count=500&startIndex=206000")
parseContacts("https://slxweb.sssworld.com/sdata/slx/dynamic/-/contacts?include=Account&select=contactid,FirstName,LastName,NameLF,Name,Createdate,Account/$key,Account/AccountName&format=json&count=500")
#Get Tickets and Accounts Modified in the last month
#parseAccounts("https://slxweb.sssworld.com/sdata/slx/dynamic/-/accounts?include=Address&select=accountid,accountname,Notes,Address/Address1,Address/State,Address/City,Address/PostalCode,Createdate&where=ModifyDate ge @" + Date.today.prev_month.strftime("%Y-%m-%d") + "@&format=json&count=500")
#parseTickets("https://slxweb.sssworld.com/sdata/slx/dynamic/-/tickets?include=TicketSolution,TicketProblem,AssignTo,Account&select=subject,ticketid,TicketSolution/notes,TicketProblem/notes,CreateDate,NeededByDate,ReceivedDate,Account/AccountName,AssignedTo/User/UserName&where=ModifyDate ge @" + Date.today.prev_month.strftime("%Y-%m-%d") + "@ or TicketProblem.ModifyDate ge @" + Date.today.prev_month.strftime("%Y-%m-%d") + "@ or TicketSolution.ModifyDate ge @" + Date.today.prev_month.strftime("%Y-%m-%d") + "@&count=1000&format=json")
