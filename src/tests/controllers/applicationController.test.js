const applicationController = require('../../controllers/applicationController');

describe('ApplicationController test', () => {
  const req = {
    body: {
      payload: `[
        {
          "type": "initialize_account",
          "payload": {
            "name": "Joana Bárbara Caldeira",
            "document": "999.999.999-99",
            "available-limit": 1000
          }
        }
      ]`
    }
  };

  it('Should register account', () => {
    let response = applicationController.initialize(req);

    let expected_response = [
      {
        "type": "initialize_account",
        "status": "success",
        "result": {
          "name": "Joana Bárbara Caldeira",
          "document": "999.999.999-99",
          "available-limit": 1000
        }
      }
    ];

    expect(response).toEqual(expected_response);
  });
});
