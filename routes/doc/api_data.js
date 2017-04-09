define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "/usr/src/app/doc/main.js",
    "group": "_usr_src_app_doc_main_js",
    "groupTitle": "_usr_src_app_doc_main_js",
    "name": ""
  },
  {
    "type": "delete",
    "url": "/user/:idFB",
    "title": "Request User information",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "idFB",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "204",
            "description": ""
          },
          {
            "group": "Success 200",
            "optional": false,
            "field": "User",
            "description": "<p>with idFB deleted</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "v2/user.js",
    "group": "_usr_src_app_routes_v2_user_js",
    "groupTitle": "_usr_src_app_routes_v2_user_js",
    "name": "DeleteUserIdfb"
  },
  {
    "type": "get",
    "url": "/user/:id",
    "title": "Request User information",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "idFB",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>object</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": ""
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "User",
            "description": "<p>not found</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "v2/user.js",
    "group": "_usr_src_app_routes_v2_user_js",
    "groupTitle": "_usr_src_app_routes_v2_user_js",
    "name": "GetUserId"
  },
  {
    "type": "post",
    "url": "/user/",
    "title": "Request User information",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "idFB",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "dataFB",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "201",
            "description": "<p>{Object}</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "v2/user.js",
    "group": "_usr_src_app_routes_v2_user_js",
    "groupTitle": "_usr_src_app_routes_v2_user_js",
    "name": "PostUser"
  }
] });
