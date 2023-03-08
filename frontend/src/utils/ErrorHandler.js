const handleBadResponse = (res) => {
  //Custom error message
  try {
    res.json().then(({errorMessage}) => {
      alert(errorMessage);
    });
  }
    //Other error
  catch (err) {
    alert("Oops! Something went wrong");
  }
};


export default handleBadResponse;