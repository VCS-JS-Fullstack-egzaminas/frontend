import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="flex justify-center">
      <div className="container px-6 my-12">
        <div className="flex flex-col md:flex-row">
          <div className="w-1/2">
            <h1 className="text-left font-bold text-3xl mb-6">Contacts</h1>
            <h2>
              <strong>Have Questions? Contact Us!</strong>
            </h2>
            <p>
              We&apos;re here to help! Whether you need assistance with your
              booking, have questions about our services, or just want to learn
              more, feel free to reach out to us.
            </p>
            <br />
            <h2>
              <strong>Email:</strong> info@vcsrentals.lt
            </h2>
            <h2>
              <strong>Phone Numbers:</strong> Lithuania: +370 612 34567 /
              International (UK): +44 20 7946 1234
            </h2>
            <p>
              <strong>Working Hours:</strong> Our customer support team is
              available 24/7 to assist you with any inquiries.
            </p>
            <div className="">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3878.7108101143426!2d25.27333125072153!3d54.68683693527319!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dd93fb5c6408f5%3A0x400d18c70e9dc40!2sVilnius%2C%20Vilnius%20City%20Municipality%2C%20Lithuania!5e0!3m2!1sen!2s!4v1724000696892!5m2!1sen!2s"
                width="100%"
                height="445"
                style={{ border: 0,
                  borderRadius:12
                 }}
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <br />
            </div>
          </div>
          <div className="w-1/2">
            <Card className="w-full  ml-10">
              <h2>Send us a message</h2>
              <form className="flex flex-col gap-4" action="#">
                <div className="grid gap-1">
                  <Label htmlFor="email">Your email</Label>
                  <Input placeholder="Your email" name="email" id="email" />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="first-name">Your firstname</Label>
                  <Input
                    placeholder="Your firstname"
                    name="first-name"
                    id="first-name"
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="last-name">Your lastname</Label>
                  <Input
                    placeholder="Your lastname"
                    name="last-name"
                    id="last-name"
                  />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="topic">Topic</Label>
                  <Input placeholder="Topic" name="topic" id="topic" />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    className="border h-64 border-river-bed-50 rounded-md shadow-sm p-2 outline-none active:outline-1 "
                    placeholder="Message"
                    name="message"
                    id="message"
                  />
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
