function request(callback, mapa) {
    var vessels;
    try {
        $.post(
                "http://190.242.119.122:82/sioservices/daqonboardservice.asmx/GetVesselsPosition",
                "SessionID=&GetData=",
                function (data) {
                    var datos = JSON.parse(data.childNodes[0].innerHTML);
                    vessels = datos.vessels.vessel;
                    callback(vessels, mapa);
                }
        );
    } catch (err) {
        console.log(err);
        return err;
    }
    
}