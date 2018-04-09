/**
 * Created by irfan on 10-Jul-17.
 */
/* Deployment Profiles */

/* Local Or Default */

export class AppConfig {

    /*********************************************************************/
    /*                             Local                                 */
    /*********************************************************************/

     public static BE_HTTP_PROTOCOL = 'http';
     public static BE_HTTP_SEPARATOR = '://';
     // public static BE_API_ENDPOINT = '192.168.1.103';
    // public static BE_API_ENDPOINT = '127.0.0.1';
     // public static BE_API_ENDPOINT = '192.168.1.211';
     public static BE_API_PORT = '8080';
     public static BE_API_CONTEXT_PATH = 'AdminPortal';
     public static BE_ACCESS_CLIENT = 'APClient';
     public static BE_ACCESS_SECRET = 'APSecret';
     // public static BILLING_API_ENDPOINT = 'http://192.168.1.212:8093/ProductLicensingApplication';    //Shaista's System
     //public static BILLING_API_ENDPOINT = 'http://stagebilling.sa-brightlife.com/ProductLicensingApplication';    //Stage server
     //public static BILLING_API_ENDPOINT = 'http://192.168.1.49:8080/ProductLicensingApplication';  // Dev Server
     public static BILLING_API_ENDPOINT = 'http://192.168.1.49:8080/ProductLicensingApplication';    //Dev Server2
     public static BILLING_TOKEN_USERNAME = 'admin';
     public static BILLING_TOKEN_PASSWORD = 'admin';
     //public static CONSOLE_API_ENDPOINT = 'http://192.168.1.187:8092/BrightLife';    // Zeb's System
     public static CONSOLE_API_ENDPOINT = 'http://192.168.1.201:8090/BrightLifeap';        // Dev server
    public static CONSOLE_TOKEN_USERNAME = 'superadmin@yopmail.com';
    public static CONSOLE_TOKEN_PASSWORD = 'Password*1';
     public static CLIENT_ID = 'brightlife-alexa';
     public static CLIENT_SECRET = 'BffRe87eI46bGf0H141aT986A189L0ee2E65X7b178A';

    /*********************************************************************/
    /*                             Dev                                   */
    /*********************************************************************/

    // public static BE_HTTP_PROTOCOL = 'http';
    // public static BE_HTTP_SEPARATOR = '://';
    // public static BE_API_ENDPOINT = '127.0.0.1';
    // public static BE_API_PORT = '8080';
    // public static BE_API_CONTEXT_PATH = 'AdminPortal';
    // public static BE_ACCESS_CLIENT = 'APClient';
    // public static BE_ACCESS_SECRET = 'APSecret';
    // //public static BILLING_API_ENDPOINT = 'http://192.168.1.49:8080/ProductLicensingApplication';
    // public static BILLING_API_ENDPOINT = 'http://192.168.1.49:8080/ProductLicensingApplication';
    // public static BILLING_TOKEN_USERNAME = 'admin';
    // public static BILLING_TOKEN_PASSWORD = 'admin';
    // public static CONSOLE_TOKEN_USERNAME = 'superadmin@yopmail.com';
    // public static CONSOLE_TOKEN_PASSWORD = 'Password*1';
    // public static CONSOLE_API_ENDPOINT = 'http://192.168.1.27:8080/BrightLifeap';
    // public static CLIENT_ID = 'brightlife-alexa';
    // public static CLIENT_SECRET = 'BffRe87eI46bGf0H141aT986A189L0ee2E65X7b178A';

    /*********************************************************************/
    /*                             QA                                   */
    /*********************************************************************/

    // public static BE_HTTP_PROTOCOL = 'http';
    // public static BE_HTTP_SEPARATOR = '://';
    // public static BE_API_ENDPOINT = '192.168.1.77';
    // public static BE_API_PORT = '8080';
    // public static BE_API_CONTEXT_PATH = 'AdminPortal';
    // public static BE_ACCESS_CLIENT = 'APClient';
    // public static BE_ACCESS_SECRET = 'APSecret';
    // //public static BILLING_API_ENDPOINT = 'http://192.168.1.49:8080/ProductLicensingApplication';
    // public static BILLING_API_ENDPOINT = 'http://192.168.1.79:8080/ProductLicensingApplication';
    // public static BILLING_TOKEN_USERNAME = 'admin';
    // public static BILLING_TOKEN_PASSWORD = 'admin';
    // public static CONSOLE_TOKEN_USERNAME = 'superadmin@yopmail.com';
    // public static CONSOLE_TOKEN_PASSWORD = 'Password*1';
    // public static CONSOLE_API_ENDPOINT = 'http://192.168.1.78:8080/BrightLifeap';
    // public static CLIENT_ID = 'brightlife-alexa';
    // public static CLIENT_SECRET = 'BffRe87eI46bGf0H141aT986A189L0ee2E65X7b178A';

    /*********************************************************************/
    /*                             Staging                               */
    /*********************************************************************/
    /* With SSL*/

    // public static BE_HTTP_PROTOCOL = 'https';
    // public static BE_HTTP_SEPARATOR = '://';
    // public static BE_API_ENDPOINT = 'adminbl.sa-brightlife.com';
    // public static BE_API_PORT = '443';
    // public static BE_API_CONTEXT_PATH = 'AdminPortal';
    // public static BE_ACCESS_CLIENT = 'APClient';
    // public static BE_ACCESS_SECRET = 'APSecret';
    // public static BILLING_API_ENDPOINT = 'https://stagebilling.sa-brightlife.com/ProductLicensingApplication';
    // public static BILLING_TOKEN_USERNAME = 'admin';
    // public static BILLING_TOKEN_PASSWORD = 'admin';
    // public static CONSOLE_API_ENDPOINT = 'https://stage.sa-brightlife.com/BrightLifeap';
    // public static CONSOLE_TOKEN_USERNAME = 'superadmin@yopmail.com';
    // public static CONSOLE_TOKEN_PASSWORD = 'Password*1';
    // public static CLIENT_ID = 'brightlife-alexa';
    // public static CLIENT_SECRET = 'BffRe87eI46bGf0H141aT986A189L0ee2E65X7b178A';

    /*Without SSL*/

    /*public static BE_HTTP_PROTOCOL = 'http';
    public static BE_HTTP_SEPARATOR = '://';
    public static BE_API_ENDPOINT = 'adminportal.sa-brightlife.com';
    public static BE_API_PORT = '8080';
    public static BE_API_CONTEXT_PATH = 'AdminPortal';
    public static BE_ACCESS_CLIENT = 'APClient';
    public static BE_ACCESS_SECRET = 'APSecret';
    public static BILLING_API_ENDPOINT = 'http://stagebilling.sa-brightlife.com/ProductLicensingApplicationap';
    public static BILLING_TOKEN_USERNAME = 'admin';
    public static BILLING_TOKEN_PASSWORD = 'admin';
    public static CONSOLE_API_ENDPOINT = 'http://stage.sa-brightlife.com:8080/BrightLifeap';
  // public static CONSOLE_TOKEN_USERNAME = 'superadmin@yopmail.com';
    // public static CONSOLE_TOKEN_PASSWORD = 'Password*1';
    public static CLIENT_ID = 'brightlife-alexa';
    public static CLIENT_SECRET = 'BffRe87eI46bGf0H141aT986A189L0ee2E65X7b178A'; */

    /*********************************************************************/
    /*                             Production Consumer                   */
    /*********************************************************************/

    /*public static BE_HTTP_PROTOCOL = 'https';
    public static BE_HTTP_SEPARATOR = '://';
    public static BE_API_ENDPOINT = 'consumerapbe.sa-brightlife.com';
    public static BE_API_PORT = '443';
    public static BE_API_CONTEXT_PATH = 'AdminPortal';
    public static BE_ACCESS_CLIENT = 'APClient';
    public static BE_ACCESS_SECRET = 'APSecret';
    public static BILLING_API_ENDPOINT = 'https://consumerbilling.sa-brightlife.com/ProductLicensingApplication';
    public static BILLING_TOKEN_USERNAME = 'admin';
    public static BILLING_TOKEN_PASSWORD = 'admin';
    public static CONSOLE_API_ENDPOINT = 'https://consoleconsumer.sa-brightlife.com/BrightLife';
   // public static CONSOLE_TOKEN_USERNAME = 'superadmin@yopmail.com';
    // public static CONSOLE_TOKEN_PASSWORD = 'Password*1';
    public static CLIENT_ID = 'brightlife-alexa';
    public static CLIENT_SECRET = 'BffRe87eI46bGf0H141aT986A189L0ee2E65X7b178A';*/

    /*********************************************************************/
    /*                             Production Consumer                   */
    /*********************************************************************/

    // public static BE_HTTP_PROTOCOL = 'https';
    // public static BE_HTTP_SEPARATOR = '://';
    // public static BE_API_ENDPOINT = 'adminportalent.sa-brightlife.com';
    // public static BE_API_PORT = '443';
    // public static BE_API_CONTEXT_PATH = 'AdminPortal';
    // public static BE_ACCESS_CLIENT = 'APClient';
    // public static BE_ACCESS_SECRET = 'APSecret';
    // public static BILLING_API_ENDPOINT = 'https://billing.sa-brightlife.com/ProductLicensingApplicationap';
    // public static BILLING_TOKEN_USERNAME = 'admin';
    // public static BILLING_TOKEN_PASSWORD = 'admin';
    // public static CONSOLE_API_ENDPOINT = 'https://console.sa-brightlife.com/BrightLife';
    // public static CONSOLE_TOKEN_USERNAME = 'superadmin@yopmail.com';
    // public static CONSOLE_TOKEN_PASSWORD = 'Password*1';
    // public static CLIENT_ID = 'brightlife-alexa';
    // public static CLIENT_SECRET = 'BffRe87eI46bGf0H141aT986A189L0ee2E65X7b178A';

}