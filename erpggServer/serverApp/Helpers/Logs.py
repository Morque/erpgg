from datetime import datetime 

path = 'tmp.log'

def Register(str_event):
    file_object = open(path, 'a')
    line_text = datetime.now().strftime('%Y-%m-%d %I:%M').__str__() + ' | message: | ' + str_event + '\n'
    file_object.write(line_text)
    file_object.close()
    return




