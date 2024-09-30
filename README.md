# Chrome Tags App for Chrome on Android

This project is a simple React application that demonstrates how to use the Web NFC API to read from and write to NFC tags using Chrome on Android devices.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)

## Installation

To set up this project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/jesuspinar/chrometags-app.git
   ```

2. Navigate to the project directory:
   ```
   cd chrometags-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open the application in Chrome on an Android device by navigating to the local server address. Make sure your Android device and development machine are on the same network.

## Usage

1. Click the "Start NFC Scan" button to begin scanning for NFC tags.
2. Hold an NFC tag near your device to read its content.
3. To write to an NFC tag, enter a message in the input field and click "Write to NFC Tag".
4. Hold an NFC tag near your device to write the message.

## Limitations

The Web NFC API, which this application uses, has several limitations:

1. **Browser Support**: Web NFC is currently only supported in Chrome for Android. It is not available in desktop browsers or other mobile browsers.

2. **Android Version**: Web NFC requires Android 5.0 (Lollipop) or later.

3. **Secure Context**: Web NFC only works in secure contexts (HTTPS), except for localhost which is considered secure for development purposes.

4. **User Interaction**: Reading NFC tags requires user interaction (like clicking a button) before the scan can start.

5. **Limited Tag Types**: Web NFC supports reading and writing to NFC Forum Tags (Types 1 to 5). Other tag types or proprietary formats may not be supported.

6. **No Background Operation**: The Web NFC API can't operate when the browser is in the background or the screen is locked.

7. **Data Size Limitations**: There may be limitations on the amount of data that can be read from or written to an NFC tag, depending on the tag type and capacity.

8. **No Peer-to-Peer Communication**: Web NFC doesn't support peer-to-peer communication between devices.

9. **No Secure Element Access**: Web NFC cannot access a device's secure element, which is used for secure NFC applications like payments.

For the most up-to-date information on limitations and capabilities, please refer to the official Web NFC documentation on the Chrome Developers website.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
