import React from 'react';
import quotations from './data-quotations';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quotationBank: [...quotations],
            citation: '',
            author: '',
            twitterhref: '',
            color: '',
        };
    };

    componentDidMount(){
        this.getQuotation()
    }

    getQuotation = () => {
        let index = '';
        let citation = '';
        do {
            index = this.getIndex();
            citation = this.state.quotationBank[index].quote;
        } while (citation === this.state.citation) ;
        let author = this.state.quotationBank[index].author;
        this.setState({
            citation,
            author
        });
        const currentColor = getComputedStyle(document.documentElement).getPropertyValue('--color');
        let newColor = '';
        do {
            newColor = this.getColor();
        } while (newColor === currentColor);
        document.documentElement.style.setProperty('--color', newColor);
    };

    getColor = () => {
        var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
        const index = Math.floor(Math.random() * ((colors.length - 1) - 0 + 1)) + 0;
        return colors[index];
    }

    getIndex = () => {
        const index = Math.floor(Math.random() * ((this.state.quotationBank.length - 1) - 0 + 1)) + 0;
        return index;
    };

    handlehrefTwitter = () => {
        const currentAuthor = this.state.author;
        const currentQuote = this.state.citation;
        const href = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor);
        document.getElementById("tweet-quote").href=href;
    };

    handlehrefTumblr = () => {
        const currentAuthor = this.state.author;
        const currentQuote = this.state.citation;
        const href = "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" + encodeURIComponent(currentAuthor) + '&content=' + encodeURIComponent(currentQuote) + '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button';
        document.getElementById("tumblr-quote").href=href;
    };

    render(){
        return(
            <div id="quote-box">
                <div id="quote">
                    <p id="text">"{this.state.citation}"</p>
                    <p id="author">- {this.state.author}</p>
                </div>
                <div id="button">
                    <button id="new-quote" onClick={this.getQuotation}>New quote</button>
                    <div id="social-media">
                        <a href='twitter' id="tweet-quote" target="_blank">
                            <img onClick={this.handlehrefTwitter} id="twitter-img" alt="twitter logo" src="https://lh3.googleusercontent.com/Z2na77cfNExZ_6P4B3TnnWPB1YlR2lUFxoXClopLOm_pj9FNdEQ3lxna541Fh1nlros"/>
                        </a>
                        <a href='tumblr' id="tumblr-quote" target="_blank">
                            <img onClick={this.handlehrefTumblr} id="tumblr-img" alt="tumblr logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAclBMVEU5WXb///8wU3IrUHCKmKartLw2V3USQWGZpbI5WnZGYnuqtL4hSmsdSGogSmsnTW719vfd4eTr7e/k5+mirrlsf5JVb4W4wMhZcYimsLzL0daGlaNgdoyToa3V2t1AXnjCydB0h5gANFiyu8R+jp5OaIFlQlbPAAADqUlEQVR4nO3dbXOiMBSG4ZDYiEqMUhTXl7bW+v//4uq03V1dEoOlwzmnz/3dGa6BAQLEqKWS3ajvDUAIIYQQQgghhBBCCCGE+GRNc7bvDesqqyfNraQQza+suYHue9M6yq+lC90MQubZcQAoRqg30oUmly6cPkoX2lK40G5DQClCvZMuDN7RiBHaIFCIMHw1lCKcPgkX2ucwUIbQ18KF9jk0rpAi9A8RoARheOAkRVi8CBfqRRQoQGiCowohwsgdqQxhER5UyBD6yA2pCKHf3wTyFibsQd5CN0gAMhZaM0kB8hWa8TwJyFVoh8EnwCKEtlgEHwBLEOpiEXlowV1otdebNj5OQndqeNzVsfF8U9Xr8Haub90p3xLWsue+fUqNvlc47v+LDQghhBBCCCGEEEIIIYQQQgghhBBCCCGEEEIIIYSQi9BMHq5KfAk1v/5dU4e+eeeu5/e+3vie7bOBC0wQvqhvXVPTVCGbN6TXOQghJN8PECZ+UsNXGJ41CiGX5AsLCCEkH4QQ0g9CCOn3A4Sy51soCCHkEIT8hTenOPMXJk4O4iuUf5TKF8o/ShOnAXMWVhBCSD0IIaQfhBDSD0II6QchhPRLFVYkv6xMKVW49n1v6b1B+Nm86HtL7w3CP0LxR+ns2P9Eg/sKr0pyFdslrZKFW/FCtjc1ycIXrqeaZCHbS36yMJMvrJgS04XZ9ua5xmqCJ9wWwnIZHUFpP93uCN4XtBBm2X4aAhg/3dRlluX0rimthFntGgTWGF19fNKR0xsotxNmszd9seiq1X60Ovz9vpGgMLJMV3NltXXe6HPGuPHb+mJqGEVhu334viPrPB9sBnlel9eziAkK7Y2VO1pGUKicfGHb/0xmJzSxdaxkCBMfY/AV2k7/SIKkUCfOdWYrjC8oJ0IYWV5VirDLw5SksNOzKU2hPUoXKh9fNk+AMLoAqQhhhxcMqkKlu7r9Jis0Set2cRYmTw7iK7QdHad0hUqvpAuV6eSBDWWhMm/ShZ3sRdpCZb4+jiIuVPrYbjE2fkJl/R2PwFkJT5f+8Zd2IwOhsm6fOK2Uq/D8MrfV2o8Xbei9IW1Me3W44y5udliw2IXvGbeo/nt3Fqmc71bO0HuLH8sat9y/pByv8/VgoQuK32HczGpvxstDHX7c+FRPlkfjteXI+8ha493QLfOqOjyVs/ce1w9VNVBDV3jDGfdv9vxXz959dIIZw+S0iRBCCCGEEEIIIYQQQgj11KjvDfjufgNV3UixN450mQAAAABJRU5ErkJggg=="/>
                        </a>
                    </div>
                </div>
                
            </div>
        );
    };
};

export default App;