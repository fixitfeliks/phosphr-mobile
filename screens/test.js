fetch('http://192.168.1.172/pinode/networks/', {
          method: 'GET'
      })
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson);
          if(responseJson){
              text = JSON.stringify(responseJson);
          }else{
              text = "No Response, try again";
          }
      })
      .catch((error) => {
        console.log(error);
          text = JSON.stringify(error);
      });