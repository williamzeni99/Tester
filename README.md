# Tester
Made for testing C compiled files, with input text


# How to use it
This node script is a simple C compiled tester. Using it is very simple, just follow this guidelines: 
* Download the repo
* Be sure to have Nodejs installed on your pc (tested on Node v18.15.0)
* enter the project directory with your terminal
* run the following command *npm install* to be sure every package is installed correctly
* fill the *config.json* file in a proper way
    * **exe_path**, insert the path of your executable. It could be an *.exe* or an *.sh* file (never tested on macOs but it should work). For instace *"C:\\Users\\myUser\\Desktop\\test.exe"* on Windows. 
    * **test_folder**, insert the folder in which the txt files for testing are available. The script ignores sub-directories and other file extension. The name of the file will be the *key* associated to the test. 
    * **output_folder**, put here the directory in which the executable outputs will be stored. The output associated to the given test will have the format *key_output.txt*. 
    * **real_output_folder**, put here the directory in which the real output files have been saved. With "real" I mean the values the program should check with output. Save each real output file as *key_realoutput.txt*, so the program can understand which file has to be checked. 
    * **result_folder**, when the script ends it will save the results of the tests in a file called *test_result*. Put here the folder in which you want to save this file. 
* run *npm start* to see the magic

If you think about it, because of the formatting of the files *output_folder*, *real_output_folder* and *result_folder* can be the same, but *test_folder* must be different, in order to don't catch extra txt files that are not test. 

**Important:** avoid using relative paths (just use absolute path) if you dont have the folders in the same directory of the executable; do not use test name with spaces, fill them with somenthing. For istance *test 1.txt* will not work, but *test_1.txt* will. 