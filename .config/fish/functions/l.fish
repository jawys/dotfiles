# Defined in - @ line 1
function l --wraps='ls -1' --wraps='ls -1tr' --description 'alias l=ls -1tr'
  ls -1tr $argv;
end
