class ApplicationController < ActionController::API
  before_action :require_login

  def require_login
    url = "http://localhost:9200/xtivia/user/" + params["userid"].to_s
    uri = URI.parse(url)

    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri)

    request['Content-Type'] = 'application/json'
    res = http.request(request)

    body = JSON.parse(res.body)

    if(params["token"] != body["_source"]["token"])
      render json: {"error" => "login failed", "user"=>session}, status: 401
    end
  end

end
