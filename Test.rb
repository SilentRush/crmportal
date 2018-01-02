require "date"
require "time"
variable = ''
File.open('datevar.variable', 'r') { |file| file.each_line do |line|
    variable = line
  end }
puts variable
d = Time.now
d = d.iso8601
File.open('datevar.variable', 'w') { |file| file.write(d) }
