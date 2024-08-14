import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Label from "../../components/ui/Label";

const ComponentsDemo = () => {
  return (
    <div className="flex justify-center">
      <div className="container px-6">
        <h1 className="font-bold text-center my-2 text-4xl">COMPONENTS DEMO</h1>
        <div className="grid gap-8">
          <div>
            <h2 className="font-semibold text-2xl my-2">Button</h2>
            <div className="flex gap-2">
              <Button type="submit">Primary</Button>
              <Button color="secondary">Secondary</Button>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-2xl my-2">Card</h2>
            <div className="flex gap-2">
              <Card>
                <div className="grid gap-2">
                  <h3 className="font-bold">Card header</h3>
                  <p>This is a card</p>
                </div>
              </Card>
              <Card>
                <p>Šis komponentas gali talpinti bet ką</p>
                <p>(Stiliaus helperis)</p>
              </Card>
            </div>
          </div>
          <div>
            <h2 className="font-semibold text-2xl my-2">Input and Label</h2>
            <div className="flex gap-2">
              <div className="grid gap-1">
                <Label>Text</Label>
                <Input type="text" />
              </div>
              <div className="grid gap-1">
                <Label>Password</Label>
                <Input type="password" />
              </div>
              <div className="grid gap-1">
                <Label>Date</Label>
                <Input type="date" />
              </div>
              <div className="grid gap-1">
                <Label>Placeholder and disabled</Label>
                <Input
                  type="text"
                  placeholder="Your username here..."
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsDemo;
