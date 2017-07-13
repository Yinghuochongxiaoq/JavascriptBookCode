function WhoAmI() {
    console.log("I'm " + this.name + " of " + typeof (this));
};

WhoAmI();

var BillGates = { name: "Bill Gates" };
BillGates.WhoAmI = WhoAmI;
BillGates.WhoAmI();

var StevelJobs = { name: "Steve Jobs" };
StevelJobs.WhoAmI = WhoAmI;
StevelJobs.WhoAmI();

WhoAmI.call(BillGates);

WhoAmI.call(StevelJobs);

BillGates.WhoAmI.call(StevelJobs);

StevelJobs.WhoAmI.call(BillGates);

WhoAmI.WhoAmI = WhoAmI;
WhoAmI.name = "WhoAmI";
WhoAmI.WhoAmI();

({ name: "nobody", WhoAmI: WhoAmI }).WhoAmI();