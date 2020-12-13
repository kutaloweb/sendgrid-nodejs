# SENDGRID NODEJS CONTACT US

SENDGRID NODEJS is a tool which allows you to send Contact Us email using SendGrid, Express, NodeJS and React.

## Getting Started

These instructions will get you a copy of the project up and running on your local Linux or Mac OS X machine

### Installing

Move to your web projects directory and clone the application using Git

```
cd /var/www/html
git clone https://github.com/kutaloweb/sendgrid-nodejs.git
```

Move to application directory

```
cd sendgrid-nodejs
```

Install the application dependencies

```
npm install
```

Rename `.env.example` to `.env` and change the values to your own.

Execute the NPM script

```
npm run start
```

Your simplified ReactJS code should look like this:

```jsx
import React, {Component} from 'react';

class Contact extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buttonDisabled: true,
            message: {name: "", fromEmail: "", subject: "", body: "", phone: ""},
            submitting: false,
            error: null,
        }
    }

    onClick = async event => {
        event.preventDefault()
        this.setState({submitting: true})
        const {name, fromEmail, subject, body, phone} = this.state.message

        const response = await fetch("http://localhost:9000/email", {
            method: "post",
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: new URLSearchParams({name, fromEmail, subject, body, phone}).toString(),
        })
        if (response.status === 200) {
            this.setState({
                error: null,
                submitting: false,
                message: {
                    name: "",
                    fromEmail: "",
                    subject: "",
                    body: "",
                    phone: "",
                },
            })
        } else {
            const json = await response.json()
            this.setState({
                error: json.error,
                submitting: false,
            })
        }
    }

    onChange = event => {
        const name = event.target.getAttribute("name")
        this.setState({
            message: {...this.state.message, [name]: event.target.value},
        })
    }

    render() {
        return (
            <form id="contactForm">
                <div className="row">
                    <div className="col-lg-6">
                        <input type="text"
                               id="name"
                               name="name"
                               className="form-control"
                               placeholder="Your Name*"
                               value={this.state.message.name}
                               onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6">
                        <input type="text"
                               id="fromEmail"
                               name="fromEmail"
                               className="form-control"
                               placeholder="Your Email*"
                               value={this.state.message.fromEmail}
                               onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6">
                        <input type="text"
                               id="subject"
                               name="subject"
                               className="form-control"
                               placeholder="Subject*"
                               value={this.state.message.subject}
                               onChange={this.onChange}
                        />
                    </div>
                    <div className="col-lg-6">
                        <input type="text"
                               id="phone"
                               name="phone"
                               className="form-control"
                               placeholder="Phone*"
                               value={this.state.message.phone}
                               onChange={this.onChange}
                        />
                    </div>
                </div>
                <textarea
                    name="body"
                    id="body"
                    className="form-control"
                    rows="6"
                    placeholder="Your Message ..."
                    value={this.state.message.body}
                    onChange={this.onChange}
                />
                <button
                    type="submit"
                    className="btn send_btn theme_btn"
                    disabled={this.state.submitting}
                    onClick={this.onClick}
                >
                    Send Message
                </button>
            </form>
        )
    }
}

export default Contact;
```

## Contributing

As an open project, I welcome contributions from everybody. Please, feel free to fork the repository and submit pull requests

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Premium Support

Want help with implementation or new features? Start a conversation with me: kutalo84@gmail.com
