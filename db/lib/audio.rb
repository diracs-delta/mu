module Audio
  def self.duration_of(filepath)
    escaped_filepath = filepath
      .gsub('[', '\\[')
      .gsub(']', '\\]')
      .gsub(' ', '\ ')
    pipe = "ffmpeg -i #{escaped_filepath} 2>&1 | grep 'Duration' | cut -d ' ' -f 4 | sed s/,//"
    command = `#{pipe}`
    if command =~ /([\d][\d]):([\d][\d]):([\d][\d]).([\d]+)/
      #convert result to secs
      duration = ($1.to_i * 3600) + ($2.to_i * 60) + ($3.to_i) + ($4.to_f / 100)
    end
    duration
  end
end