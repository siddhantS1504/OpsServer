# Express Calculator API

This repository contains a simple Express.js application that serves as a calculator API. It allows you to perform basic arithmetic operations by sending requests to specific endpoints. Additionally, it maintains a history of calculations performed during the server's runtime.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Available Endpoints](#available-endpoints)
  - [Sample Requests](#sample-requests)
- [History](#history)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository to your local machine using the following command:
git clone https://github.com/your-username/express-calculator-api.git


2. Navigate to the project directory:

cd express-calculator-api

3. Install the required dependencies:

npm install express


4. Start the server:

npm start





The server will be up and running on port 3000 by default.

## Usage

### Available Endpoints

1. **/history**: Retrieve the history of calculations performed on the server.

2. **/:operands/:operation/:operands2?/:operation2?/...**: Perform arithmetic operations using a flexible URL structure. You can chain multiple operations by providing additional sets of operands and operations.

3. **/**: Access the list of available sample endpoints.

### Sample Requests

Here are some sample endpoints you can use to test the API:

- `/5/plus/3`
- `/3/minus/5`
- `/3/minus/5/plus/8`
- `/3/into/5/plus/8/into/6`
- `/6/divide/2`
- `/2/plus/3/plus/4`
- `/1/plus/2/plus/3/plus/4/plus/5/plus/6`

You can modify and extend these endpoints to experiment with different calculations.

To view the list of available sample endpoints, you can access the root URL:

- `/`

## History

The server maintains a history of calculations made during its runtime. The history is stored in a JSON file named `history.json`. The history is loaded when the server starts, and you can retrieve it using the `/history` endpoint.

## Contributing

Contributions to this calculator API are welcome! If you find any issues or want to add new features, feel free to create a pull request. Please ensure that your code follows the project's coding standards.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this README according to your project's needs. Good luck with your Express Calculator API! If you have any questions, don't hesitate to contact us.
