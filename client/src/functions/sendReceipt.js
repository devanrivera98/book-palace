const ElasticEmail = require('@elasticemail/elasticemail-client');
const client = ElasticEmail.ApiClient.instance;
const elasticEmailApiKey = process.env.ELASTIC_EMAIL_API_KEY;

const emailApi = new ElasticEmail.TemplatesApi();

const emailData = {
  Recipients: {
    To: ["devanrivera98@gmail.com"]
  },
  Content: {
    Body: [
      {
        ContentType: "HTML",
        Charset: "utf-8",
        Content: "Mail content."
      },

    ],
    From: "bookpalace.azurewebsites@gmail.com",
    Subject: "Book Palace Test Receipt"
  }
};


const callback = (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
    console.log('Email sent.');
  }
};

emailApi.emailsTransactionalPost(emailData, callback);
