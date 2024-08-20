import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import "./Contact.css";

const Contact = () => {
  return (
        <div>
          <div className="contactContainer flex">
           <div className="contactUs" >
    
           <br />
            <h2 id="title">
              <strong>Have Questions? Contact Us!</strong>
            </h2>
            <br />
            <p>
              We&apos;re here to help! Whether you need assistance with your
              booking, have questions about our services, or just want to learn
              more, feel free to reach out to us.
            </p>
            <br />
            <hr />
            <br />
            <div className="infoBox ">
            <svg className="svgOne " stroke="currentColor" fill="none" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"></path></svg>
            <h2 className="email"><strong >Email:</strong>
             <br /> info@vcsrentals.lt <br />
            </h2></div>
            <div className="infoBox">
            <svg className="svgOne" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M16.585,19.999l2.006-2.005l-2.586-2.586l-1.293,1.293c-0.238,0.239-0.579,0.342-0.912,0.271 c-0.115-0.024-2.842-0.611-4.502-2.271s-2.247-4.387-2.271-4.502c-0.069-0.33,0.032-0.674,0.271-0.912l1.293-1.293L6.005,5.408 L4,7.413c0.02,1.223,0.346,5.508,3.712,8.874C11.067,19.643,15.337,19.978,16.585,19.999z"></path><path d="M16.566 21.999c.005 0 .023 0 .028 0 .528 0 1.027-.208 1.405-.586l2.712-2.712c.391-.391.391-1.023 0-1.414l-4-4c-.391-.391-1.023-.391-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594c.391-.391.391-1.023 0-1.414l-4-4c-.375-.375-1.039-.375-1.414 0L2.586 5.999C2.206 6.379 1.992 6.901 2 7.434c.023 1.424.4 6.37 4.298 10.268S15.142 21.976 16.566 21.999zM6.005 5.408l2.586 2.586L7.298 9.287c-.239.238-.341.582-.271.912.024.115.611 2.842 2.271 4.502s4.387 2.247 4.502 2.271c.333.07.674-.032.912-.271l1.293-1.293 2.586 2.586-2.006 2.005c-1.248-.021-5.518-.356-8.873-3.712C4.346 12.921 4.02 8.636 4 7.413L6.005 5.408zM19.999 10.999h2c0-5.13-3.873-8.999-9.01-8.999v2C17.051 4 19.999 6.943 19.999 10.999z"></path><path d="M12.999,8c2.103,0,3,0.897,3,3h2c0-3.225-1.775-5-5-5V8z"></path></svg>
            <h2><strong>Phone Numbers:</strong> 
            <br /> Lithuania: +370 612 34567 / International (UK): +44 20 7946 1234
            </h2>
            </div>
            <div className="infoBox">
            <svg className="svgOne" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M21 8a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1.062A8.001 8.001 0 0 1 12 23v-2a6 6 0 0 0 6-6V9A6 6 0 1 0 6 9v7H3a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1.062a8.001 8.001 0 0 1 15.876 0H21zM7.76 15.785l1.06-1.696A5.972 5.972 0 0 0 12 15a5.972 5.972 0 0 0 3.18-.911l1.06 1.696A7.963 7.963 0 0 1 12 17a7.963 7.963 0 0 1-4.24-1.215z"></path></g></svg>
            <h2><strong>Working Hours:</strong>
             <br />Our customer support team is available 24/7 to assist you with any inquiries.
            </h2>
            </div>
            <br />
            <hr />
            <br />
            <div className="items-center justify-center md:justify-start flex gap-6">
                  <a href="https://www.facebook.com/" target="_blank">
                    <svg className="hover:text-ecstasy-400"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      width="35"
                      height="35"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/" target="_blank">
                    <svg className="hover:text-ecstasy-400"
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      width="35"
                      height="35"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="https://x.com/" target="_blank">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="35"
                      fill="currentColor"
                      className="bi bi-twitter-x hover:text-ecstasy-400"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                    </svg>
                  </a>
                </div>
            </div>
            
          <div className="cardContainer">
            <Card className="cardOne">
              <h2>Send us a message</h2>
              <br />
              <form className="forma flex flex-col gap-4" action="#">
                <div className="grid gap-1">
                  <Label htmlFor="email"></Label>
                  <Input placeholder="Your email" name="email" id="email" />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="first-name"></Label>
                  <Input
                    placeholder="Your firstname"
                    name="first-name"
                    id="first-name"
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="last-name"></Label>
                  <Input
                    placeholder="Your lastname"
                    name="last-name"
                    id="last-name"
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="topic"></Label>
                  <Input placeholder="Topic" name="topic" id="topic" />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="message"></Label>
                  <textarea
                    className="border border-river-bed-50 rounded-md shadow-sm p-2 outline-none active:outline-1 "
                    placeholder="Message"
                    name="message"
                    id="message"
                  />
                </div>
                <Button type="submit">Send Message</Button>
              </form>
            </Card>
          </div>
          </div>

      <div className="mapContainer">
              <iframe className="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3878.7108101143426!2d25.27333125072153!3d54.68683693527319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd93fb5c6408f5%3A0x400d18c70e9dc40!2sVilnius%2C%20Vilnius%20City%20Municipality%2C%20Lithuania!5e0!3m2!1sen!2s!4v1724000696892!5m2!1sen!2s"
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <br />
         </div>
         </div>
         
  );
};

export default Contact;
