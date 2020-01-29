var fs = require('fs');
var objectMerge = require('object-merge');
var os            = require('os');
var systemOS      = os.platform();
// environment configs from configEnv.js
var static_string_server = fs.readFileSync("./configEnv.json");

// code configs
var code_obj =
{
    "db_authors": "authors",
    "db_students": "aak_students",
    "db_request": "request",
    "db_response": "response",
    "db_mailLog": "mail_log",
    "db_examineer_exam": "examineer_exam",
    "db_examineer_metadata": "examineer_metadata",
    "db_graphics": "graphics",
    "db_working": "working",
    "db_examineer_response": "examineer_response",
    "db_testdb": "testdb",
    "db_raw_elements": "raw_elements",
    "db_graphics_metadata": "graphics_metadata",
    "db_user": "nodejs",
    "db_pass": "nodejs",
    "db_exam_db": "examineer_exam",
    "db_elements_metadata": "elements_metadata",
    "db_playlist": "playlists",
    "global_db": "global",
    "db_publist": "publist",
    "db_workbooks": "workbooks",
    "db_wbpublished": "wbpublished",
    "db_ticketRaise": "tickets",
    "allow_emails_for_signup": "00allowed",
    "quizapp_link": "https://examineer.in/quizApp/quiz-app/#/",

    "//////  Server req msg             ": "",
    "sessExpr" : "Session is expired !",
    "notAuth" :  "Your are not authorized user.",
    "examineerTitle" : "Examineer|Admin",
    "notFound":"Record not found",

    "email_already_exist": "email already exist",
    "email_free": "email free",
    "some_error_here": "Some error here !",
    "User_already_exist": "User already exist",
    "A_new_member_join_our_group": "A new member join our group !",
    "Message_sent": "Message sent: ",
    "Account_created": "Account created, check your inbox for account activation",
    "Collb_verified": "Id has been verified !",
    "mail_send_fail": "Unable to send mail",
    "password_not_match": "password not match",
    "Email_Password_Invaild": "Email & Password Invaild",
    "Unable_to_process": "Unable to process !",
    "Account_active": "Your account has not been activated. Check your inbox ?",
    "mail_sent1": " Reset link send to : ",
    "mail_sentAccountReq": " Mail successfully sent for an account request.",
    "email_not_found": "User not found !",
    "password_reset": "Password Reset",
    "password_change": " password change !",
    "invaild_request": " Invaild request !",
    "password_mismatch": "Password mismatch !",
    "feild_empty": "All field are mandatory",
    "account_active_msg": " Your account is active",
    "collb_accept_msg": " You have been successfully added as a collabrators",
    "collb_reject_msg": " You have been rejected your collabrators request",

    "custome_error_page_jade": "mail_temp/custom_error_page.jade",
    "custome_error_page_string": "Custome Error Page",
    "something_bad_happened_string": "Something Bad Happened !",
    "account_already_active_string": "Your account already valid ",
    "account_already_rejected": "You have already rejected the collabrator request ! ",
    "account_already_verified": "You have already accepted the collabrator request ! ",
    "invaild_activation_request_string": "Either your account is active or request is invalid",
    "short_name_not_allowed": "This short name not allowed, try another !",

    "//////  SMTP oauth config          ": "",
    "sendmail_auth_emails": "support@examineer.in",
    "sendmail_auth_pass": "9bf-BvW-UHH-G2r",
    "sendmail_auth_servicetype": "smtp.gmail.com",
    "sendmail_auth_portnumber": 587,
    "mail_temp_path_acceptReq": "views/mail_temp/acceptReq_email.jade",
    "mail_temp_path_rejectReq": "views/mail_temp/rejectReq_email.jade",
    "mail_temp_path_forgotpassword": "views/mail_temp/forgotPassword_email.jade",
    
    "//////  Jade mail temp link        ": "",
    "activation_email": "views/mail_temp/activation_email.jade",
    "verify_collabs": "views/mail_temp/verify_collbs.jade",
    "remove_collabs": "views/mail_temp/remove_collbs.jade",
    "pass_reset_jade": "page_temp/pass_reset.jade",
    "ticket_raised": "views/mail_temp/ticketRaise_email.jade",
    "ticket_resolved": "views/mail_temp/ticketResolve_email.jade",

    "//////  Mail Api prefix            ": "",
    "activeAccount": "authoractiveAccount",
    "password_rest_temp": "authorpasswordresttemp",
    "acceptCollbs": "author_acceptCollbReq",
    "rejectCollbs": "author_rejectptCollbReq",
    "//////  Mail static header string  ": "",
    "mail_from_string": "support@examineer.in",
    "mail_from": "<support@examineer.in>",
    "mail_subject": "Account Activation ✔",
    "mail_subject1": "Forgot Password ✔",
    "mail_subject2": "Verify Collaborators ✔",
    "//////  Mail static msg            ": "",

    "emailServerMeta": {
        "support_email": "support@examineer.in",
        "footer_line": " Do not reply to this email. For quiz related issues contact your quiz master/instructor. For technical issues, inform us at support@examineer.in .",
        "copyright": "Copyright ©&nbsp; Examineer.in ,2019, All rights reserved."
    }

    
}

 
 //linux
if(systemOS == 'linux'){  
  code_obj['logPath'] = "/var/www/html/authoradmin_logfile.log";
}
else{
  //window
  code_obj['logPath'] = "D:/nodejslearn/mynode/authoradmin_logfile.log";
}

var server_obj = JSON.parse(static_string_server);
var merge_output = objectMerge(server_obj, code_obj);
exports.merge_output = merge_output;