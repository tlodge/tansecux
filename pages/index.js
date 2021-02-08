
const IndexPage = () => {
  const id = Math.round(Math.random()  * 500);

  return (
    <div id="welcome">
        <p>
          In this project we are looking at how we can make it easy for any person to set up a VPN. A VPN allows a person to access all of the devices in their home from their mobile phone,no matter where they are.  VPNs can be tricky to set up, and they require information to be shared between a router and a mobile phone. We are investigating ways that this can be made easier. 
        </p>

        <p>
            To take part in these experiments we need you to use two devices - preferably, one device should be a laptop or desktop, and the other should be a mobile phone. You will need to access a url on a browser on each device;  To get going please use the following two urls:
        </p>
        <div className="flex flex-row">            
          <div className="flex flex-col p-6">
            <div>Click the following url on your desktop</div>
            <div><a href={`/router/scenario1/intro/${id}`} target="_blank">{`[]/router/scenario1/intro/${id}`}</a></div>
          </div> 
          <div className="flex flex-col p-6">
            <div>Enter the following url on your mobile</div>
            <div><a href={`/mobile/scenario1/intro/${id}`} target="_blank">{`[]/mobile/scenario1/intro/${id}`}</a></div>
          </div> 
        </div>


    </div>
  );
};

export default IndexPage;