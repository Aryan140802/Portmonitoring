/*
document.addEventListener("DOMContentLoaded",async ()=> {
uid=localStorage.getItem('uidd')
  password=localStorage.getItem('password')
  try{
     const response  = await fetch('https://10.191.171.12:5443/PyPortal/EISHome/authenticatePortal/',{
     method:'POST',
     headers:{
             'Content-Type':'application/json',
    },
    body: JSON.stringify({uid,password})
    });
    const data = await response.json();
    if(data.status==302){
            console.log("login successfull")
    }
    else{
          window.location.href='https://10.191.171.12:5443/PyPortal/'
    }
  }
catch(e){
console.log("an error occured for login"+e)

}
});


*/








document.body.style.zoom = "70%";



function Clear_Screen(){
    const screen = document.getElementById('tablecontainer_div')
    screen.innerHTML = '';
    screen.style.backgroundColor = "black"; 
	  let timediv = document.getElementById("Datedisplay_div");
        timediv.innerHTML = ""

}


let selector = document.getElementById("select_zone");
selector.addEventListener('change', async (event) => {
    const selected_zone = event.target.value;
   await  updateview(selected_zone);
})


async function updateview(zone) {
    
	Clear_Screen() ; 
    await Make_ZONE_TABLES(zone)
}






let interids = [];

function clearallintervals() {
    interids.forEach((id) => {
        clearInterval(id);
    })
}







var LOOKUPIP_IMG = ''

getlookup_img();

function getlookup_img() {
	 let x = ''
    fetch('lookup_img.txt').then(response => {
        if (!response.ok) {
            throw new Error('no lookup_img found ');
        }
        return response.text();
    }).then(ip => {
        // console.log(`lookupfound ${ip}`)
        LOOKUPIP_IMG = ip;
	      x = ip  ;
    })
	return x ; 
}







function IMAGE_CHECK() {
    let x = document.getElementsByTagName("td")
    let  IMAGE = [];
    for (let i = 0; i < x.length; i++) {
        const IMAGE_TST = /_image_p_td/

        try {

            if (IMAGE_TST.test(x[i].id)) {
                IMAGE.push(x[i].id)
            }

        }
        catch {
             console.log("NANOBJ")
        }
    }

    if (LOOKUPIP_IMG !== "") {
        let pointin_img = ''
const PR = /10.0.20./
const DR = /10.176.20./
        if (PR.test(LOOKUPIP_IMG)){
            pointin_img = 'PR'
        }   else if (DR.test(LOOKUPIP_IMG)){
            pointin_img = 'DR'
        }else{
            console.log(`ERROR : IMAGE DB TRUE POINTING NOT FOUND `)
            return;
        }

        IMAGE.forEach(TD => {
            const TDdiv = document.getElementById(TD);
            const IMAGE = TDdiv.innerText.trim()
            if (IMAGE  == pointin_img ) {
                TDdiv.style.background = 'green'
            }
            else {
                TDdiv.style.background = 'red'
            }

        });
    }else{
        console.log(`NO LOOKUPIP_IMG Found `)
    }

     console.log(IMAGE);
}








var LOOKUPIP = ''

getlookup();

function getlookup() {
    fetch('lookup.txt').then(response => {
        if (!response.ok) {
            throw new Error('nolookup found ');

        }
        return response.text();
    }).then(ip => {
        // console.log(`lookupfound ${ip}`)
        LOOKUPIP = ip;
    })
}




let IGNORE = {
    "aceprsys09": ["AADHAR_SYS", "NON_CBS_ACCOUNT_SYS"],
    "eisdraccsys-01": ["ACCOUNT_SYS_01"],
    "eisdr-idhubexp-01": [],
    "eisdrpaymentexp-01": [],
    "eisdrivrexp-01": [],
    "eisdrmiscexp-01": ["MISC_EXP_02"],
    "eispraccexp-01": [],
    "eispraccsys-01": [],
    "aceprexp01": ["CUSTOMER_LOGGER_EXP"],
	"eisprloginsys-01" : ["LOGGING_SYS_01", "LOGGING_SYS_02"],
"eisprloginexp-01" : ["LOGGING_EXP_01", "LOGGING_EXP_02"],
"eisprnongen5-01" : ["CUSTOMER","EISBRK10_PROD_04","MISC_SYS","Sys_Brk_CBS"]	 

};





let table = {
                "NEW ACCOUNT_EXP [ 8 + 2 ]" :{
                "PR" : ["eispraccexp-01","eispraccexp-02","eispraccexp-03","eispraccexp-04","eispraccexp-05","eispraccexp-11","eispraccexp-12","eispraccexp-13","eispraccexp-14","eispraccexp-15"]
                ,
                "DR" : ["eisdraccexp-01","eisdraccexp-02","eisdraccexp-03","eisdraccexp-04","eisdraccexp-05","eisdraccexp-11","eisdraccexp-12","eisdraccexp-13","eisdraccexp-14","eisdraccexp-15"]
                } ,
                "NEW ACCOUNT_SYS [ 10 + 2 ]" :{
                "PR" : ["eispraccsys-01","eispraccsys-02","eispraccsys-03","eispraccsys-04","eispraccsys-05","eispraccsys-06","eispraccsys-11","eispraccsys-12","eispraccsys-13","eispraccsys-14","eispraccsys-15","eispraccsys-16"]
                ,
                "DR" : ["eisdraccsys-01","eisdraccsys-02","eisdraccsys-03","eisdraccsys-04","eisdraccsys-05","eisdraccsys-06","eisdraccsys-11","eisdraccsys-12","eisdraccsys-13","eisdraccsys-14","eisdraccsys-15","eisdraccsys-16"]
                } ,
                "NEW CUSTOMER_EXP [ 8 + 2 ]" :{
                "PR" : ["eisprcustexp-01","eisprcustexp-02","eisprcustexp-03","eisprcustexp-04","eisprcustexp-05","eisprcustexp-11","eisprcustexp-12","eisprcustexp-13","eisprcustexp-14","eisprcustexp-15"]
                ,
                "DR" : ["eisdrcustexp-01","eisdrcustexp-02","eisdrcustexp-03","eisdrcustexp-04","eisdrcustexp-05","eisdrcustexp-11","eisdrcustexp-12","eisdrcustexp-13","eisdrcustexp-14","eisdrcustexp-15"]
                } ,
                "NEW CUSTOMER_SYS [ 10 + 2 ]" :{
                "PR" : ["eisprcustsys-01","eisprcustsys-02","eisprcustsys-03","eisprcustsys-04","eisprcustsys-05","eisprcustsys-06","eisprcustsys-11","eisprcustsys-12","eisprcustsys-13","eisprcustsys-14","eisprcustsys-15","eisprcustsys-16"]
                ,
                "DR" : ["eisdrcustsys-01","eisdrcustsys-02","eisdrcustsys-03","eisdrcustsys-04","eisdrcustsys-05","eisdrcustsys-06","eisdrcustsys-11","eisdrcustsys-12","eisdrcustsys-13","eisdrcustsys-14","eisdrcustsys-15","eisdrcustsys-16"]
                } ,
                "NEW LOGGING_EXP [ 8 + 2 ]" :{
                "PR" : ["eisprloginexp-01","eisprloginexp-02","eisprloginexp-03","eisprloginexp-04","eisprloginexp-05","eisprloginexp-11","eisprloginexp-12","eisprloginexp-13","eisprloginexp-14","eisprloginexp-15"]
                ,
                "DR" : ["eisdrloginexp-01","eisdrloginexp-02","eisdrloginexp-03","eisdrloginexp-04","eisdrloginexp-05","eisdrloginexp-11","eisdrloginexp-12","eisdrloginexp-13","eisdrloginexp-14","eisdrloginexp-15"]
                } ,
                "NEW LOGGING_SYS [ 10 + 2 ]" :{
                "PR" : ["eisprloginsys-01","eisprloginsys-02","eisprloginsys-03","eisprloginsys-04","eisprloginsys-05","eisprloginsys-06","eisprloginsys-11","eisprloginsys-12","eisprloginsys-13","eisprloginsys-14","eisprloginsys-15","eisprloginsys-16"]
                ,
                "DR" : ["eisdrloginsys-01","eisdrloginsys-02","eisdrloginsys-03","eisdrloginsys-04","eisdrloginsys-05","eisdrloginsys-06","eisdrloginsys-11","eisdrloginsys-12","eisdrloginsys-13","eisdrloginsys-14","eisdrloginsys-15","eisdrloginsys-16"]
                } ,
                "NEW PAYMENY_EXP [ 6 + 2 ]" :{
                "PR" : ["eisprpaymentexp-01","eisprpaymentexp-02","eisprpaymentexp-03","eisprpaymentexp-04","eisprpaymentexp-11","eisprpaymentexp-12","eisprpaymentexp-13","eisprpaymentexp-14"]
                ,
                "DR" : ["eisdrpaymentexp-01","eisdrpaymentexp-02","eisdrpaymentexp-03","eisdrpaymentexp-04","eisdrpaymentexp-11","eisdrpaymentexp-12","eisdrpaymentexp-13","eisdrpaymentexp-14"]
                } ,
                "NEW PAYMENY_SYS [ 8 + 2 ]" :{
                "PR" : ["eisprpaymentsys-01","eisprspaymentsys-02","eisprpaymentsys-03","eisprpaymentsys-04","eisprpaymentsys-05","eisprpaymentsys-11","eisprpaymentsys-12","eisprpaymentsys-13","eisprpaymentsys-14","eisprpaymentsys-15"]
                ,
                "DR" : ["eisdrpaymentsys-01","eisdrpaymentsys-02","eisdrpaymentsys-03","eisdrpaymentsys-04","eisdrpaymentsys-05","eisdrpaymentsys-11","eisdrpaymentsys-12","eisdrpaymentsys-13","eisdrpaymentsys-14","eisdrpaymentsys-15"]
                } ,
                "NEW MISC_EXP [ 8 + 2 ]" :{
                "PR" : ["eisprmiscexp-01","eisprmiscexp-02","eisprmiscexp-03","eisprmiscexp-04","eisprmiscexp-05","eisprmiscexp-11","eisprmiscexp-12","eisprmiscexp-13","eisprmiscexp-14","eisprmiscexp-15"]
                ,
                "DR" : ["eisdrmiscexp-01","eisdrmiscexp-02","eisdrmiscexp-03","eisdrmiscexp-04","eisdrmiscexp-05","eisdrmiscexp-11","eisdrmiscexp-12","eisdrmiscexp-13","eisdrmiscexp-14","eisdrmiscexp-15"]
                } ,
                "NEW MISC_SYS [ 6 + 2 ]" :{
                "PR" : ["eisprmiscsys-01","eisprmiscsys-02","eisprmiscsys-03","eisprmiscsys-04","eisprmiscsys-05","eisprmiscsys-11","eisprmiscsys-12","eisprmiscsys-13","eisprmiscsys-14","eisprmiscsys-15"]
                ,
                "DR" : ["eisdrmiscsys-01","eisdrmiscsys-02","eisdrmiscsys-03","eisdrmiscsys-04","eisdrmiscsys-05","eisdrmiscsys-11","eisdrmiscsys-12","eisdrmiscsys-13","eisdrmiscsys-14","eisdrmiscsys-15"]
                } ,
                "NEW IVR_EXP [ 4 + 2 ]" :{
                "PR" : ["eisprivrexp-01", "eisprivrexp-02", "eisprivrexp-03","eisprivrexp-11", "eisprivrexp-12", "eisprivrexp-13"]
                ,
                "DR" : ["eisdrivrexp-01", "eisdrivrexp-02", "eisdrivrexp-03","eisdrivrexp-11", "eisdrivrexp-12", "eisdrivrexp-13"]
                } ,
                "NEW IVR_SYS [ 6 + 2 ]" :{
                "PR" : ["eisprivrsys-01","eisprivrsys-02","eisprivrsys-03","eisprivrsys-04","eisprivrsys-11","eisprivrsys-12","eisprivrsys-13","eisprivrsys-14"]
                ,
                "DR" : ["eisdrivrsys-01","eisdrivrsys-02","eisdrivrsys-03","eisdrivrsys-04","eisdrivrsys-11","eisdrivrsys-12","eisdrivrsys-13","eisdrivrsys-14"]
                } ,
                "NEW AADHAR_EXP [ 4 + 2 ]" :{
                "PR" : ["eispr-idhubexp-01", "eispr-idhubexp-02", "eispr-idhubexp-03","eispr-idhubexp-11", "eispr-idhubexp-12", "eispr-idhubexp-13"]
                ,
                "DR" : ["eisdr-idhubexp-01", "eisdr-idhubexp-02", "eisdr-idhubexp-03","eisdr-idhubexp-11", "eisdr-idhubexp-12", "eisdr-idhubexp-13"]
                } ,
                "NEW AADHAR_SYS [ 6 + 2 ]" :{
                "PR" : ["eispr-idhubsys-01", "eispr-idhubsys-02", "eispr-idhubsys-03", "eispr-idhubsys-04","eispr-idhubsys-11", "eispr-idhubsys-12", "eispr-idhubsys-13", "eispr-idhubsys-14"]
                ,
                "DR" : ["eisdr-idhubsys-01", "eisdr-idhubsys-02", "eisdr-idhubsys-03", "eisdr-idhubsys-04","eisdr-idhubsys-11", "eisdr-idhubsys-12", "eisdr-idhubsys-13", "eisdr-idhubsys-14"]
                } ,
                "NONGEN-5 [ 4 ]" :{
                "PR" : ["eisprnongen5-01","eisprnongen5-02","eisprnongen5-11","eisprnongen5-12"]
                ,
                "DR" : ["eisdrnongen5-01","eisdrnongen5-02","eisdrnongen5-11","eisdrnongen5-12"]
                } ,
}



let tables = {
    "GEN5SYS ": {
        "PR": ["aceprsys09", "aceprsys10", "aceprsys11", "aceprsys12", "aceprsys13", "aceprsys14", "aceprsys15", "aceprsys16", "logprsys01", "logprsys02"],
        "DR": [
            "acedrsys09",
            "acedrsys10",
            "acedrsys11",
            "acedrsys12",
            "acedrsys13",
            "acedrsys14",
            "acedrsys15",
            "acedrsys16"
        ]
    }
}



///CHECK CBS

function CBSCHECK() {
    let x = document.getElementsByTagName("td")
    CBSSI = [];
    SYSTEMAPI = [];
    for (let i = 0; i < x.length; i++) {
        const cbssi = /_cbssi_p_td/
        const systemapi = /_system_p_td/
        try {

            if (cbssi.test(x[i].id)) {
                CBSSI.push(x[i].id)
            }
            if (systemapi.test(x[i].id)) {
                SYSTEMAPI.push(x[i].id)
            }
        }
        catch {
            // console.log("NANOBJ")
        }

        SYSTEMAPI.forEach(TD => {
            const TDdiv = document.getElementById(TD);
            const LB = TDdiv.innerText.trim().split(".")
            // // console.log(`for ip TDCBSSI ${Pre}`)
            //const Prea = Pre.trim()
            //let LB = Pre.split(".")
            if (LB[3] == '92') {
                TDdiv.style.background = 'green'
            }
            else {
                TDdiv.style.background = 'red'
            }
        });
        if (LOOKUPIP !== "") {
            CBSSI.forEach(TD => {
                const TDdiv = document.getElementById(TD);
                const cbssi = TDdiv.innerText.trim().split(".")
                let lookupip = LOOKUPIP.trim().split(".")
                // console.log(`for ip TDCBSSI ${Pre}`)
                if (cbssi[3] == lookupip[3]) {
                    TDdiv.style.background = 'green'
                }
                else {
                    TDdiv.style.background = 'red'
                }
            });
        }

    }

    //    // console.log(CBSSI);
}


///IGNORE THIS FUNCTION



///IGNORE THIS FUNCTION

function IGNORETHIS(IGNORE) {
	console.log(`runnning ignore this with ${IGNORE}`)
    Object.keys(IGNORE).forEach(function (key) {
        IGNORE[key].forEach(x => {

            try {
                const rownm = `${key}_${x}_tr`
                let row = document.getElementById(rownm)
                row.style.textDecoration = 'line-through'
                row.style.color = 'black'
                row.style.fontWeight = 'bold'

                let tds = row.getElementsByTagName('td')
                for (var i = 0; i < tds.length; i++) {
                    tds[i].setAttribute('class', 'ignore');
		    tds[i].style.backgroundColor  = "black" ;
                }
            }
            catch {
                // console.log(`${key}_${x}_tr row doesnt exist `)
            }

        })
    })
}



//////////////////////////////////////DROPDOWN

function Dropdown() {
    const Div = document.getElementById('DROP_DOWN')
    Div.style.background = 'brown'
    Div.style.color = 'black'
    Object.keys(table).forEach(function (key) {

        const divid = table[key]['PR'][0] + '_tablediv'
        const onediv = document.createElement('div')
        onediv.setAttribute('class', 'one_dropdowndiv')
        onediv.onclick = function () {
            const element = document.getElementById(divid);
            element.scrollIntoView();

            function blink() {
                element.style.opacity = element.style.opacity === '0' ? '1' : '0'
            }
            const intervalid = setInterval(() => {
                blink();
            }, 500);

            setTimeout(() => {
                clearInterval(intervalid)
            }, 2000);
        }
        //onediv.innerText  = divid
        onediv.innerText = key;
        Div.appendChild(onediv)
    })
}

Dropdown()


//////////////////////////////////////DROPDOWN/////////////////////////////////////////////



///// FETCHING THE REAL.JSON FROM LOCAL FOLDER



 Make_ZONE_TABLES('UNIFIED');

async function Make_ZONE_TABLES(zone) {

    fetch('real.json')
        .then(function (resp) {
            return resp.json();
        })
        .then( function (snex) {
            ///MAKING TABLE

            fetch('W.json')
                .then(function (resp) {
                    return resp.json();
                }).then(async function (W) {
                    await maketables(table, snex, W, zone )
                    IGNORETHIS(IGNORE);

                    setTimeout(() => {
			IMAGE_CHECK();
                        CBSCHECK();
                    }, 0);

                })
        })
}





//// THE MAKE TABLE FUNCTION TAKES TABLE STRUCTURE AND DATA AS INPUT

/// making  function to get date diff

function getdiff(DD) {
    function month(m) {
        let x = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const mIndex = x.indexOf(m);
        if (mIndex != -1) {
            let index = mIndex + 1;
            if (index < 10) {
                x = `0${index}`
                return x;
            }
            else {
                return index;
            }
        }
        else {
            return "invalid month"
        }
    }

    //  let DD = x[j].date ;
    let a = DD.split(' ')
    let givendate = `${a[5]}-${month(a[1])}-${a[2]}T${a[3]}`
    //// console.log(givendate) ;

    // let m = "2023-11-15T15:12"
    const GD = new Date(givendate);
    const CD = new Date();
    const TimeDiff = CD.getTime() - GD.getTime();
    return TimeDiff / 60000;
}


/////////////////////////////////////






async function maketables(TABLE_STRUCT_DATA, snex, W, zone) {
    const colour24 = '#c780dd';
    const colour25 = '#60c2ff';
    const colour41 = '#c780dd';
    const colourdr = 'white';

    Object.keys(TABLE_STRUCT_DATA).forEach(async function (key) {
      await   makeonetable(TABLE_STRUCT_DATA[key], key, snex, zone, W);
    }
    )
}












//IPADDTIME  FILLER /////////////////
let refreshinterval = setInterval(() => {
  
	try {refill();}
	catch{console.log(`refill error `)}
	
setTimeout(() => {
  IGNORETHIS(IGNORE);

}, 100 );


  console.log(`running ignore`)
  IGNORETHIS(IGNORE);
	//
}, 30000);

interids.push(refreshinterval)

function refreshpage() {

    location.reload()
}











async function makeonetableonly(LIST_JSON, key, snex, zone, W) {

    let PRarr = LIST_JSON.PR
    let DRarr = LIST_JSON.DR
    let UNIFIEDarr = [...PRarr, ...DRarr]

    let ARR = [];
    if (zone == 'PR') {
        ARR = PRarr;
    } else if (zone == 'DR') {
        ARR = DRarr;
    } else if (zone == 'UNIFIED') {
        ARR = UNIFIEDarr;
    } else {
        console.error(`ZONE SPECIFIED IS WRONG IT CAN EITHER BE PR/DR/UNIFIED only `)
    }




    console.log(ARR);
    //////////////////////////////MaIN snex has whole json
    let div_order = 0;
    let count = 0;
    let ROWs = [];
    let tablename = "";
    let ISOcount = 0;
    let ROW_IS = [];
    //////////////////////////////////Making tables based on PR DR UNIFIED in the zone


    /////////////////STRICTLY FOR ISOLATOR
    ARR.forEach(x => {

        // let divmain;
        // let table1;
        //////////////////////////// CREATE TABLE AND THE TITLE DIV INSIDE IT  AND TABLE
        if (count == 0) {

            tablename = x;
            title_div_str = x;
            let title_table_div = document.createElement("div");
            const replaced = title_div_str.replace(/[0-9]/g, '');
            title_div_str = replaced.toUpperCase();
            title_table_div.setAttribute("class", "table_title_div");
            title_table_div.innerText = key;

            title_table_div.onclick = function () {
                let d = document.getElementById('pin_div')
                const id = x + "_tablediv"
                let m = document.getElementById(id)
                let parent = m.parentElement


                if (parent.id == 'tablecontainer_div') {

                    d.append(m)
                }
                else {
                    let par = document.getElementById('tablecontainer_div')
                    par.append(m)

                }


            };

            let divmain = document.createElement("div");
            divmain.setAttribute("class", "onetable_div");
            divmain.setAttribute("id", x + "_tablediv");
            let table1 = document.createElement("table");
            table1.setAttribute("class", "demonclass");
            table1.setAttribute("id", x + "_tb");
            divmain.appendChild(title_table_div);

            divmain.appendChild(table1);
            let tablecontainer = document.getElementById("tablecontainer_div");
            tablecontainer.appendChild(divmain);
            // body.appendChild(divmain);
            // let tablename = x;
        }
        //////////////////////////////////////FOR FIRST IP TABLE
        if (count == 0) {
            //to print IP
            ////////////////////////////////   CATCH THE TABLE MADE ABOVE ;

            let table1 = document.getElementById(x + "_tb")


            /////////////// first row for defining zones if UNIFIED IS being made

            if (zone == 'UNIFIED') {
                let tr_zone = document.createElement("tr");
                tr_zone.setAttribute("id", x + "_zone");


                let zonename = document.createElement("td")
                zonename.innerText = "ENVIRONMENT";
                zonename.setAttribute("class", "Zone_title");
                zonename.setAttribute("colspan", "2");
                tr_zone.appendChild(zonename);

                let td_zone = document.createElement("td")
                td_zone.innerText = "PR";
                td_zone.setAttribute("class", "zone_pr_title");
                const tdprlen = PRarr.length;
                td_zone.style.background = 'blue'
                td_zone.setAttribute("colspan", tdprlen);
                tr_zone.appendChild(td_zone);

                let td_zone_dr = document.createElement("td")
                td_zone_dr.innerText = "DR";
                td_zone_dr.setAttribute("class", "zone_dr_title");
                const tddrlen = DRarr.length
                td_zone_dr.setAttribute("colspan", tddrlen);
                td_zone_dr.style.background = 'red'
                tr_zone.appendChild(td_zone_dr);
                table1.appendChild(tr_zone)
            }

            let trip = document.createElement("tr");
            trip.setAttribute("id", x + "_th")
            let tdb_ip = document.createElement("tr");
            tdb_ip.setAttribute("id", x + "IP_th");



            let td_ip_1 = document.createElement("td")
            td_ip_1.innerText = "HOSTNAME";
            td_ip_1.setAttribute("class", "HN_title");
            td_ip_1.setAttribute("colspan", "2");
            // td_ip_1.setAttribute("rowspan", "2")
            tdb_ip.appendChild(td_ip_1);



            ////////////////////////////////////////////////////////////////////////////////////

     //
	
	let tdb1 = document.createElement("td")
           tdb1.innerText = "BROKER";
            tdb1.setAttribute("class", "BROKER_title")
           trip.appendChild(tdb1)

           let tdb2 = document.createElement("td")
           tdb2.innerText = "PORT";
            tdb2.setAttribute("class", "PORT_title")
            trip.appendChild(tdb2);


            let th1 = document.createElement("td");
            th1.innerText = x;
            th1.setAttribute("class", "TH_IP_ALL");
            trip.appendChild(th1);

            table1.appendChild(tdb_ip);
            table1.appendChild(trip);


            //to print for all brokers

            // let table1 = document.getElementById(x + "_tb")
		/////////BROKER RESTART
		
		let brokres_row = document.createElement("tr");
            brokres_row.setAttribute("class", "brokerres_row");
            brokres_row.setAttribute("id", tablename + "_brokerr");
            table1.appendChild(brokres_row);
            let tdbrokres_title = document.createElement("td");

            tdbrokres_title.innerText = "BROKER";
            tdbrokres_title.setAttribute("class", "BROKERR_title");
            brokres_row.appendChild(tdbrokres_title);
            let tdbrokres_blank = document.createElement("td");
            tdbrokres_blank.innerText = "Last Broker Restart";
            tdbrokres_blank.setAttribute("class", "lsthitb_title")
            brokres_row.appendChild(tdbrokres_blank);
	

            ////////////CACHE_MAINROW//////////////////////////////////////////////////////////////////////////////
            let cacherow = document.createElement("tr");
            cacherow.setAttribute("class", "cache_row");
            cacherow.setAttribute("id", tablename + "_cache");
            table1.appendChild(cacherow);
            let tdcachetitle = document.createElement("td");

            tdcachetitle.innerText = "CACHE";
            tdcachetitle.setAttribute("class", "CACHE_title");
            cacherow.appendChild(tdcachetitle);
            let tdcacheblank = document.createElement("td");
            tdcacheblank.innerText = "Last Hit Time";
            tdcacheblank.setAttribute("class", "lsthit_title")
            cacherow.appendChild(tdcacheblank);
            ////////////CACHE_MAINROW////////////////////////



            ////////////SYSTEM_POINGING//////////////////////////////////////////////////////////////////////////////
            let system_row = document.createElement("tr");
            system_row.setAttribute("class", "system_p_row");
            system_row.setAttribute("id", tablename + "_p_system");
            table1.appendChild(system_row);
            let s_p_desc = document.createElement("td");

            s_p_desc.innerText = "POINTING";
            s_p_desc.setAttribute("class", "SYSTEM_title");
            system_row.appendChild(s_p_desc);
            let tdsystempointing = document.createElement("td");
            tdsystempointing.innerText = "system.api";
            tdsystempointing.setAttribute("class", "SYSTEM_NAME")
            system_row.appendChild(tdsystempointing);
            ////////////SYSTEM_POINGING////////////////////////


            ////////////cbssi_POINTING//////////////////////////////////////////////////////////////////////////////
            let cbssi_p_row = document.createElement("tr");
            cbssi_p_row.setAttribute("class", "system_p_row");
            cbssi_p_row.setAttribute("id", tablename + "_p_cbssi");
            table1.appendChild(cbssi_p_row);
            let cbssi_p_desc = document.createElement("td");

            cbssi_p_desc.innerText = "POINTING";
            cbssi_p_desc.setAttribute("class", "SYSTEM_title");
            cbssi_p_row.appendChild(cbssi_p_desc);
            let tdcbssipointing = document.createElement("td");
            tdcbssipointing.innerText = "cbssi.sbi.co.in";
            tdcbssipointing.setAttribute("class", "SYSTEM_NAME")
            cbssi_p_row.appendChild(tdcbssipointing);

            ////////////cbssi_POINTING////////////////////////


            ////////////AADHAR_POINTING//////////////////////////////////////////////////////////////////////////////
            let aa_p_row = document.createElement("tr");
            aa_p_row.setAttribute("class", "adhar_p_row");
            aa_p_row.setAttribute("id", tablename + "_p_adhar");
            table1.appendChild(aa_p_row);
            let aa_p_desc = document.createElement("td");

            aa_p_desc.innerText = "POINTING";
            aa_p_desc.setAttribute("class", "POINTING_title");
            aa_p_row.appendChild(aa_p_desc);
            let tdadharpointing = document.createElement("td");
            tdadharpointing.innerText = "AADHAR";
            tdadharpointing.setAttribute("class", "POINTING_NAME")
            aa_p_row.appendChild(tdadharpointing);
            ////////////AADHAR_POINTING////////////////////////


            ////////////CBS_POINTING//////////////////////////////////////////////////////////////////////////////
            let cbs_p_row = document.createElement("tr");
            cbs_p_row.setAttribute("class", "adhar_p_row");
            cbs_p_row.setAttribute("id", tablename + "_p_cbs");
            table1.appendChild(cbs_p_row);
            let cbs_p_desc = document.createElement("td");

            cbs_p_desc.innerText = "POINTING";
            cbs_p_desc.setAttribute("class", "POINTING_title");
            cbs_p_row.appendChild(cbs_p_desc);
            let tdcbspointing = document.createElement("td");
            tdcbspointing.innerText = "CBS";
            tdcbspointing.setAttribute("class", "POINTING_NAME")
            cbs_p_row.appendChild(tdcbspointing);

            ////////////CBS_POINTING////////////////////////

            // let chk = 0;
            ///////////to print all the ips and brokers
            try {
                if (typeof snex[x] == "object") {
                    // console.log(x + "this thing exists")

                    //////////////FOR IP

                    let IP_N0_ROW = document.getElementById(tablename + "IP_th");
                    let rowip_td = document.createElement("td");
                    rowip_td.setAttribute("class", "Td_for_ipadd");
                    let idip = `${x}_IP_td`
                    rowip_td.setAttribute("id", idip);
                    let stip = snex[x].ip;
                    const ipar = stip.split(".")
                    if (ipar[2] === '25' || ipar[2] === '41') {
                        rowip_td.style.background = colour25
                    }
                    else {
                        rowip_td.style.background = colour24
                    }
                    ipadd = ipar[2] + '.' + ipar[3];


                    let updatetime = document.createElement("div");
                    updatetime.setAttribute("class", "ip_update_div");
                    let tec = snex[x].date;
                    const iii = tec.split(" ");
                    let ip_jst_dt = `${iii[1]}-${iii[2]} ${iii[3]}`;
                    const fl = ip_jst_dt.split(":");
                    ip_jst_dt = `LAST UPDATED :${fl[0]}:${fl[1]}`;
                    updatetime.innerText = ip_jst_dt;



                    rowip_td.innerText = ipadd;
                    IP_N0_ROW.appendChild(rowip_td);
                    rowip_td.appendChild(updatetime)


                    function cache_hit() {


                        var response = confirm("Are you sure you want to hit cache on " + stip + "?")
                        if (response == true) {


                            // console.log("hitting cache on:", stip);
                            window.open('https://10.191.171.12:5543/EIS/EIS_CACHE_HIT/cache_hit.php?ip=' + stip, '_blank')
                        }

                    }
                    rowip_td.ondblclick = cache_hit;

                    //TIME CHECK
                    let diff = getdiff(snex[x].date);
                    if (diff > 9 || diff == "invalid month") {
                        rowip_td.style.background = "yellow";
                        updatetime.style.background = "red";
                        let printdate = `Updated ${Math.round(diff)} mins ago`
                        updatetime.innerText = printdate;
                        // console.log(diff);
                    }
                    // console.log(`for this ip is ${diff} mins behind `);
                    ////////////////////////


                    //////////////FOR IP /////
			//
			/////////////////////BROKER RESTART
			 let tdbrokres = document.createElement("td");
                      tdbrokres.innerText = snex[x].BROKER_RESTART[0];
                      tdbrokres.setAttribute("class", "broker_tdforip");
                      tdbrokres.setAttribute("id", `${x}_brokerr_td`)
                      brokres_row.appendChild(tdbrokres);


                    ///////////CACHE
                    let tdcache = document.createElement("td");
                    tdcache.innerText = snex[x].CACHE[0];
                    tdcache.setAttribute("class", "cachetdforip");
                    tdcache.setAttribute("id", `${x}_cache_td`)
                    cacherow.appendChild(tdcache);

                    ///////////CACHE\\\\\\\\\\\\\\\\\\\\\



                    ///////////SYSTEM
                    let systemrow = document.getElementById(tablename + "_p_system");
                    let tdsystemp = document.createElement("td");
                    try {
                        if (snex[x]['system.api'][0]) {
                            tdsystemp.innerText = snex[x]['system.api'][0];
                        }
                        else {
                            tdsystemp.innerText = "No Data"
                        }
                        tdsystemp.setAttribute("class", "systemtdforip");
                        tdsystemp.setAttribute("id", `${x}_system_p_td`)
                        systemrow.appendChild(tdsystemp);
                    }
                    catch {
                        //    // console.log(`no system.api found `)
                        tdsystemp.innerText = "No Data"
                        tdsystemp.setAttribute("class", "systemtdforip");
                        tdsystemp.setAttribute("id", `${x}_system_p_td`)
                        systemrow.appendChild(tdsystemp);
                    }

                    ///////////SYSTEM\\\\\\\\\\\\\\\\\\\\\

                    ///////////CBSsi
                    let cbssi = document.getElementById(tablename + "_p_cbssi");
                    let tdcbssi = document.createElement("td");
                    try {
                        if (snex[x]['cbssi.sbi.co.in'][0]) {
                            tdcbssi.innerText = snex[x]['cbssi.sbi.co.in'][0];
                        }
                        else {
                            tdcbssi.innerText = "No Data"
                        }

                        tdcbssi.setAttribute("class", "cbstdforip");
                        tdcbssi.setAttribute("id", `${x}_cbssi_p_td`)
                        cbssi.appendChild(tdcbssi);
                    } catch {
                        tdcbssi.innerText = "No Data"
                        tdcbssi.setAttribute("class", "cbstdforip");
                        tdcbssi.setAttribute("id", `${x}_cbssi_p_td`)
                        cbssi.appendChild(tdcbssi);
                    }

                    ///////////CBSsi\\\\\\\\\\\\\\\\\\\\\




















































                    ///////////AADHAR
                    let aadharrow = document.getElementById(tablename + "_p_adhar");
                    let tdaadhar = document.createElement("td");
                    if (snex[x].AADHAR_POINTING[0]) {
                        tdaadhar.innerText = snex[x].AADHAR_POINTING[0];
                    }
                    else {
                        tdaadhar.innerText = "No Data"
                    }

                    tdaadhar.setAttribute("class", "aadhartdforip");
                    tdaadhar.setAttribute("id", `${x}_aadhar_p_td`)
                    aadharrow.appendChild(tdaadhar);
                    ///////////AADHAR\\\\\\\\\\\\\\\\\\\\\






                    ///////////CBS
                    let cbsrow = document.getElementById(tablename + "_p_cbs");
                    let tdcbs = document.createElement("td");
                    if (snex[x].CBS_POINTING[0]) {
                        tdcbs.innerText = snex[x].CBS_POINTING[0];
                    }
                    else {


                        tdcbs.innerText = "No Data"
                    }

                    tdcbs.setAttribute("class", "cbstdforip");
                    tdcbs.setAttribute("id", `${x}_cbs_p_td`)
                    cbsrow.appendChild(tdcbs);
                    ///////////CBS\\\\\\\\\\\\\\\\\\\\\








                    ///////////ISOLATOR

                    for (const iso in snex[x].ISOLATOR) {

                        let currowid = tablename + "_" + iso + "_tr";
                        // console.log(currowid);
                        let thisrow = document.getElementById(currowid);

                        if (thisrow == null) {
                            // console.log("dekh isme to aya hai");
                            let table1 = document.getElementById(tablename + "_tb")
                            let newrow = document.createElement("tr");
                            newrow.setAttribute("id", currowid);
                            ROW_IS.push(currowid);
                            newrow.setAttribute("class", "isolator_row");
                            table1.appendChild(newrow);


                            let iso_td = document.createElement("td");
                            newrow.appendChild(iso_td);
                            iso_td.setAttribute("class", "isoltator_title")
                            iso_td.innerText = iso;

                            let iso_port = document.createElement("td");
                            newrow.appendChild(iso_port);
                            iso_port.setAttribute("class", "iso_port");
                            iso_port.innerText = snex[x].ISOLATOR[iso][0];



                            //print blanks before st
                            ///filling blanks before td
                            for (let i = 0; i < count; i++) {
                                let blank = document.createElement("td");
                                blank.style.backgroundColor = "black";
                                newrow.appendChild(blank);
                                // console.log("dekh isme print kiya maine blank")

                            }


                            let iso_st = document.createElement("td");
                            newrow.appendChild(iso_st);
                            iso_st.setAttribute("id", x + "_" + iso + "_td");
                            let st = snex[x].ISOLATOR[iso][1];
                            iso_st.innerText = snex[x].ISOLATOR[iso][2];
                            if (st == 0) {
                                iso_st.style.backgroundColor = "#d71111"
                                div_order -= 2;

                            }

                            else {
                                iso_st.style.backgroundColor = "#1bf0f0cf"

                            }

                        }
                        else {

                            // console.log("dekh isme  bhi to aya hai ");
                            let table1 = document.getElementById(tablename + "_tb");
                            let newrow = document.getElementById(currowid);

                            let iso_st = document.createElement("td");
                            newrow.appendChild(iso_st);
                            let st = snex[x].ISOLATOR[iso][1];
                            iso_st.innerText = snex[x].ISOLATOR[iso][2];
                            iso_st.setAttribute("id", x + "_" + iso + "_td");

                            if (st == 0) {
                                iso_st.style.backgroundColor = "#d71111"
                                div_order -= 2;

                            }

                            else {
                                iso_st.style.backgroundColor = "#1bf0f0cf"

                            }

                        }



                    }

                    ///////////ISOLATOR\\\\\\\\\\\\\\\\\\\\\



                }
                else {

                    ////NODATA IP
                    //////////////FOR IP

                    let IP_N0_ROW = document.getElementById(tablename + "IP_th");
                    let rowip_td = document.createElement("td");
                    rowip_td.setAttribute("class", "NODATA_IP");
                    rowip_td.innerText = "NO DATA";
                    IP_N0_ROW.appendChild(rowip_td);

                    //////////////FOR IP /////



                    ////NODATA CACHE
                    // console.log(x + "this thing doesnot exists")
                    let tdcache = document.createElement("td");
                    tdcache.innerText = "NODATA";
                    tdcache.setAttribute("class", "NODATA_CACHE");
                    cacherow.appendChild(tdcache);
                }
            }
            catch (err) {
                // console.log(err);
            }

            count++;

        }
        /////////////////////////////FIRST IP TABLE END


        else {
            let idth = tablename + "_th";
            // console.log(idth);
            let hEADrow = document.getElementById(idth);
            let ip = document.createElement("td");
            ip.innerText = x;
            ip.setAttribute("class", "TH_IP_ALL");
            ip.style.backgroundColor = "yellow";
            hEADrow.appendChild(ip);


            try {

                if (typeof snex[x] == "object") {

                    //////////////FOR IP
                    let IP_N0_ROW = document.getElementById(tablename + "IP_th");
                    let rowip_td = document.createElement("td");
                    rowip_td.setAttribute("class", "Td_for_ipadd");
                    let idip = `${x}_IP_td`
                    rowip_td.setAttribute("id", idip);
                    let stip = snex[x].ip;
                    const ipar = stip.split(".")
                    let ipadd = ipar[3];

                    if (ipar[2] === '25' || ipar[2] === '41') {
                        rowip_td.style.background = colour25
                    }
                    else {
                        rowip_td.style.background = colour24
                    }
                    ipadd = ipar[2] + '.' + ipar[3];


                    rowip_td.innerText = ipadd;

                    IP_N0_ROW.appendChild(rowip_td);




                    function cache_hit() {


                        var response = confirm("Are you sure you want to hit cache on " + stip + " ?")
                        if (response == true) {


                            // console.log("hitting cache on:", stip);
                            window.open('https://10.191.171.12:5543/EIS_CACHE_HIT/cache_hit.php?ip=' + stip, '_blank')
                        }

                    }
                    rowip_td.ondblclick = cache_hit;





                    let updatetime = document.createElement("div");
                    updatetime.setAttribute("class", "ip_update_div");
                    let tec = snex[x].date;
                    const iii = tec.split(" ");
                    let ip_jst_dt = `${iii[1]}-${iii[2]} ${iii[3]}`;
                    const fl = ip_jst_dt.split(":");
                    ip_jst_dt = `LAST UPDATED :${fl[0]}:${fl[1]}`;
                    updatetime.innerText = ip_jst_dt;
                    rowip_td.appendChild(updatetime)


                    //TIME CHECK
                    let diff = getdiff(snex[x].date);
                    if (diff > 9 || diff == "invalid month") {
                        rowip_td.style.background = "yellow";
                        updatetime.style.background = "red";
                        let printdate = `Updated ${Math.round(diff)} mins ago`
                        updatetime.innerText = printdate;
                        // console.log(diff);
                    }
                    // console.log(`for this ip is ${diff} mins behind `);
                    ////////////////////////
                    //////////////FOR IP /////

                    //////////////FOR CACHE
                    let cacherow = document.getElementById(tablename + "_cache")
                    let tdcache = document.createElement("td");
                    tdcache.innerText = snex[x].CACHE[0];
                    tdcache.setAttribute("class", "cachetdforip");
                    tdcache.setAttribute("id", `${x}_cache_td`)
                    cacherow.appendChild(tdcache);
                    //////////////FOR CACHE ////




                    ///////////SYSTEM
                    let systemrow = document.getElementById(tablename + "_p_system");
                    let tdsystemp = document.createElement("td");
                    try {
                        if (snex[x]['system.api'][0]) {
                            tdsystemp.innerText = snex[x]['system.api'][0];
                        }
                        else {
                            tdsystemp.innerText = "No Data"
                        }
                        tdsystemp.setAttribute("class", "systemtdforip");
                        tdsystemp.setAttribute("id", `${x}_system_p_td`)
                        systemrow.appendChild(tdsystemp);
                    }
                    catch {
                        //    // console.log(`no system.api found `)
                        tdsystemp.innerText = "No Data"
                        tdsystemp.setAttribute("class", "systemtdforip");
                        tdsystemp.setAttribute("id", `${x}_system_p_td`)
                        systemrow.appendChild(tdsystemp);
                    }

                    ///////////SYSTEM\\\\\\\\\\\\\\\\\\\\\

                    ///////////CBSsi
                    let cbssi = document.getElementById(tablename + "_p_cbssi");
                    let tdcbssi = document.createElement("td");
                    try {
                        if (snex[x]['cbssi.sbi.co.in'][0]) {
                            tdcbssi.innerText = snex[x]['cbssi.sbi.co.in'][0];
                        }
                        else {
                            tdcbssi.innerText = "No Data"
                        }

                        tdcbssi.setAttribute("class", "cbstdforip");
                        tdcbssi.setAttribute("id", `${x}_cbssi_p_td`)
                        cbssi.appendChild(tdcbssi);
                    } catch {
                        tdcbssi.innerText = "No Data"
                        tdcbssi.setAttribute("class", "cbstdforip");
                        tdcbssi.setAttribute("id", `${x}_cbssi_p_td`)
                        cbssi.appendChild(tdcbssi);
                    }

                    ///////////CBSsi\\\\\\\\\\\\\\\\\\\\\



























































                    ///////////AADHAR
                    let aadharrow = document.getElementById(tablename + "_p_adhar");
                    let tdaadhar = document.createElement("td");
                    if (snex[x].AADHAR_POINTING[0]) {
                        tdaadhar.innerText = snex[x].AADHAR_POINTING[0];
                    }
                    else {
                        tdaadhar.innerText = "No Data"
                    }

                    tdaadhar.setAttribute("class", "aadhartdforip");
                    tdaadhar.setAttribute("id", `${x}_aadhar_p_td`)
                    aadharrow.appendChild(tdaadhar);
                    ///////////AADHAR\\\\\\\\\\\\\\\\\\\\\

                    ///////////CBS
                    let cbsrow = document.getElementById(tablename + "_p_cbs");
                    let tdcbs = document.createElement("td");
                    if (snex[x].CBS_POINTING[0]) {
                        tdcbs.innerText = snex[x].CBS_POINTING[0];
                    }
                    else {


                        tdcbs.innerText = "No Data"
                    }

                    tdcbs.setAttribute("class", "cbstdforip");
                    tdcbs.setAttribute("id", `${x}_cbs_p_td`)
                    cbsrow.appendChild(tdcbs);
                    ///////////CBS\\\\\\\\\\\\\\\\\\\\\


                    //////////////////////////////////////////////////////////////// ///////////ISOLATOR

                    for (const iso in snex[x].ISOLATOR) {


                        let currowid = tablename + "_" + iso + "_tr";
                        // console.log(currowid);
                        let thisrow = document.getElementById(currowid);

                        if (thisrow == null) {
                            // console.log("dekh isme to aya hai ");
                            let table1 = document.getElementById(tablename + "_tb")
                            let newrow = document.createElement("tr");
                            newrow.setAttribute("id", currowid);
                            ROW_IS.push(currowid);
                            newrow.setAttribute("class", "isolator_row");
                            table1.appendChild(newrow);


                            let iso_td = document.createElement("td");
                            iso_td.setAttribute("class", "isoltator_title");
                            newrow.appendChild(iso_td);

                            iso_td.innerText = iso;

                            let iso_port = document.createElement("td");
                            iso_port.setAttribute("class", "iso_port");

                            newrow.appendChild(iso_port);
                            iso_port.innerText = snex[x].ISOLATOR[iso][0];

                            let iso_st = document.createElement("td");
                            iso_st.setAttribute("id", x + "_" + iso + "_td");


                            for (let i = 0; i < count; i++) {
                                let blank = document.createElement("td");
                                blank.style.backgroundColor = "black";
                                newrow.appendChild(blank);
                                // console.log("dekh isme print kiya maine blank")

                            }

                            newrow.appendChild(iso_st);
                            let st = snex[x].ISOLATOR[iso][1];
                            iso_st.innerText = snex[x].ISOLATOR[iso][2];
                            if (st == 0) {
                                iso_st.style.backgroundColor = "#d71111"
                                div_order -= 2;


                            }

                            else {
                                iso_st.style.backgroundColor = "#1bf0f0cf"

                            }

                        }
                        else {


                            // console.log("dekh isme  bhi to aya hai ");
                            let table1 = document.getElementById(tablename + "_tb");
                            let newrow = document.getElementById(currowid);
                            let iso_st = document.createElement("td");
                            newrow.appendChild(iso_st);
                            iso_st.setAttribute("id", x + "_" + iso + "_td");

                            let st = snex[x].ISOLATOR[iso][1];
                            iso_st.innerText = snex[x].ISOLATOR[iso][2];
                            if (st == 0) {
                                iso_st.style.backgroundColor = "#d71111"
                                div_order -= 2;

                            }

                            else {
                                iso_st.style.backgroundColor = "#1bf0f0cf"

                            }



                        }



                    }

                }

                else {
                    // console.log(x + "does not exist")


                    //////////////FOR IP
                    let IP_N0_ROW = document.getElementById(tablename + "IP_th");
                    let rowip_td = document.createElement("td");
                    rowip_td.setAttribute("class", "Td_for_ipadd");
                    let idip = `${x}_IP_td`
                    rowip_td.setAttribute("id", idip);
                    rowip_td.innerText = "NO DATA";
                    IP_N0_ROW.appendChild(rowip_td);



                    function cache_hit() {


                        var response = confirm("Are you sure you want to hit cache on " + stip + " ?")
                        if (response == true) {


                            // console.log("hitting cache on:", stip);
                            window.open('https://10.191.171.12:5443/EISInfra/EIS_CACHE_HIT/cache_hit.php?ip=' + stip, '_blank')
                        }

                    }
                    rowip_td.ondblclick = cache_hit;


                    //////////////FOR IP /////

                    //////////////FOR CACHE
                    let cacherow = document.getElementById(tablename + "_cache")
                    let tdcache = document.createElement("td");
                    tdcache.innerText = "NO DATA";
                    tdcache.setAttribute("class", "cachetdforip");
                    tdcache.setAttribute("id", `${x}_cache_td`)
                    cacherow.appendChild(tdcache);

                    //////////////FOR CACHE /////






                    ///////////SYSTEM
                    let systemrow = document.getElementById(tablename + "_p_system");
                    let tdsystem = document.createElement("td");
                    tdsystem.innerText = "NO DATA"
                    tdsystem.setAttribute("class", "systemtdforip");
                    tdsystem.setAttribute("id", `${x}_system_p_td`)
                    systemrow.appendChild(tdsystem);
                    ///////////SYSTEM\\\\\\\\\\\\\\\\\\\\\

                    ///////////CBSSI_P
                    let cbssirow = document.getElementById(tablename + "_p_cbssi");
                    let cbssitd = document.createElement("td");
                    cbssitd.innerText = "No Data"
                    cbssitd.setAttribute("class", "cbstdforip");
                    cbssitd.setAttribute("id", `${x}_cbssi_p_td`)
                    cbssirow.appendChild(cbssitd);
                    ///////////CBSSI_P\\\\\\\\\\\\\\\\\\\\\



                    ///////////AADHAR
                    let aadharrow = document.getElementById(tablename + "_p_adhar");
                    let tdaadhar = document.createElement("td");
                    tdaadhar.innerText = "NO DATA"
                    tdaadhar.setAttribute("class", "aadhartdforip");
                    tdaadhar.setAttribute("id", `${x}_aadhar_p_td`)
                    aadharrow.appendChild(tdaadhar);
                    ///////////AADHAR\\\\\\\\\\\\\\\\\\\\\

                    ///////////CBS
                    let cbsrow = document.getElementById(tablename + "_p_cbs");
                    let tdcbs = document.createElement("td");
                    tdcbs.innerText = "No Data"
                    tdcbs.setAttribute("class", "cbstdforip");
                    tdcbs.setAttribute("id", `${x}_cbs_p_td`)
                    cbsrow.appendChild(tdcbs);
                    ///////////CBS\\\\\\\\\\\\\\\\\\\\\








                }
            }
            catch {
                // console.log("kuch nhi karunga mai kyuki " + x + " to hai hi nhi ")

            }
            count++;

        }

        // console.log(count);
        // console.log(ROWs.length);

        // console.log("abhi count itna hai " + count);

        ROW_IS.forEach(row => {

            let ROWd = document.getElementById(row);

            let boxid = row.replace("_tr", "_td");
            boxid = boxid.replace(tablename, x);
            // console.log(boxid);


            let BoxMain = document.getElementById(boxid);
            if (BoxMain == null) {
                let blank = document.createElement("td");
                // blank.style.backgroundColor = "black";
                try {
                    // let blank = document.createElement("td");
                    let chk1 = snex[x];

                    if (typeof chk1 == "object") {

                        //blank.innerText = "nodata"
                        blank.style.backgroundColor = "black";

                        // console.log("iska data tha to blank bhara")

                    }
                    else {
                        blank.innerText = "no data";
                        blank.setAttribute("class", "blinkbroker");
                        blank.style.backgroundColor = "black";
                        blank.style.color = "white";
                        // console.log("iska data nhi tha to text bhara no data ")

                    }



                }
                catch (err) {
                    // console.log("maine black bhara for the rest ");

                }

                //blank.style.border-collapse(collapse);
                ROWd.appendChild(blank);
            }

        })



    })

    // console.log(ROW_IS);

    /////////////////STRICTLY FOR BROKER
    count = 0;
    ROWs = [];
    tablename = "";
    ISOcount = 0;



    ARR.forEach(x => {
        if (count == 0) {
            tablename = x;
        }
        //////////////////////////////////////FOR FIRST IP TABLE
        if (count == 0) {
            count++;
            let chk = 0;
            ///////////to print all the ips and brokers
            try {
                if (typeof snex[x] == "object") {
                    // console.log(x + "this thing exists")

                    for (const bk in snex[x].BROKER) {

                        let table1 = document.getElementById(tablename + "_tb");
                        let TRID = x + "_" + bk + "_tr";
                        ROWs.push(TRID);
                        // console.log(TRID);

                        let rownm = document.createElement("tr");
                        rownm.setAttribute("id", TRID);
                        let tdbknm = document.createElement("td");
                        tdbknm.innerText = bk;
                        rownm.appendChild(tdbknm);
                        if (typeof W[x]?.BROKER[bk] == "object") {
                            tdbknm.setAttribute("class", "BROKERNAME_TD")
                        }
                        else {
                            tdbknm.setAttribute("class", "N_BROKERNAME_TD")

                        }

                        let tdport = document.createElement("td");
                        tdport.innerText = snex[x].BROKER[bk][0];
                        rownm.appendChild(tdport);
                        tdport.setAttribute("class", "BK_PORTno_TD")


                        let tdstatus = document.createElement("td");



                        let tooltipdiv = document.createElement("div");
                        //  tooltipdiv.innerText = `${snex[x].BROKER[bk][2]} ${snex[x].BROKER[bk][4]}`;



                        let stip = snex[x].ip;
                        const ipar = stip.split(".")
                        let ipadd = ipar[3];




                        tooltipdiv.innerText = `${ipadd} : ${snex[x].BROKER[bk][0]}
                                                            TOTAL : ${snex[x].BROKER[bk][2]}
                                                            CLOSEWAIT : ${snex[x].BROKER[bk][4]}
                                                            ESTABLISHED : ${snex[x].BROKER[bk][5]}
                                                            TIMEWAIT : ${snex[x].BROKER[bk][3]}
                                                        `;
                        tooltipdiv.setAttribute("class", "tool_tip_div");

                        tdstatus.innerText = snex[x].BROKER[bk][2] + "/" + snex[x].BROKER[bk][4];
                        tdid = x + "_" + bk + "_td_BK";
                        tdstatus.setAttribute("id", tdid)

                        if (snex[x].BROKER[bk][6]) {
                            const por = snex[x].BROKER[bk][6]
                            function clickurl() {


                                const url1 = "http://" + stip + ":" + por;
                                var x = window.open(url1, '_blank')
                                // console.log("OPENING URL>>>>")

                            }
                            tdstatus.ondblclick = clickurl;
                        }




                        rownm.appendChild(tdstatus);
                        tdstatus.appendChild(tooltipdiv);

                        if (snex[x].BROKER[bk][1] == 0) {
                            tdstatus.style.backgroundColor = "#d71111";
                            tdstatus.innerText = "DOWN"
                            div_order -= 2;


                        }
                        else {
                            tdstatus.style.backgroundColor = "#289b28";


                            if (snex[x].BROKER[bk][4] > 100) {

                                tdstatus.style.backgroundColor = "coral";
                                div_order -= 1;
                            }
                            if (snex[x].BROKER[bk][5] >= 50) {

                                tdstatus.setAttribute("class", "wow shake infinite Est-above-50 ");
                                div_order -= 100;
                            }

                        }


                        table1.appendChild(rownm);
                        // rownm.style.b = "2px solid red";
                    }


                }
                else {
                    // console.log(x + "this thing doesnot exists")
                }

            }
            catch (err) {
                // console.log(err);
            }

        }
        /////////////////////////////FIRST IP TABLE END


        else {

            try {
                if (typeof snex[x] == "object") {

                    for (const bk in snex[x].BROKER) {
                        let id = tablename + "_" + bk + "_tr";

                        let MAINROW = document.getElementById(id);

                        if (MAINROW == null) {

                            let MAINROW = document.createElement("tr");
                            MAINROW.setAttribute("id", id);
                            ROWs.push(id);
                            let tdbknm = document.createElement("td");

                            if (typeof W[x]?.BROKER[bk] == "object") {
                                tdbknm.setAttribute("class", "BROKERNAME_TD")
                            }
                            else {
                                tdbknm.setAttribute("class", "N_BROKERNAME_TD")
                            }


                            // tdbknm.setAttribute("class", "BROKERNAME_TD");
                            tdbknm.innerText = bk;
                            MAINROW.appendChild(tdbknm);

                            let tdport = document.createElement("td");
                            tdport.innerText = snex[x].BROKER[bk][0];
                            tdport.setAttribute("class", "BK_PORTno_TD")
                            MAINROW.appendChild(tdport);


                            /////filling blanks before td
                            for (let i = 0; i < count; i++) {
                                let blank = document.createElement("td");
                                blank.style.backgroundColor = "black";
                                MAINROW.appendChild(blank);

                            }

                            let tdstatus = document.createElement("td");
                            tdstatus.innerText = snex[x].BROKER[bk][2] + "/" + snex[x].BROKER[bk][2];
                            let stip = snex[x].ip;
                            const ipar = stip.split(".")
                            let ipadd = ipar[3];



                            let tooltipdiv = document.createElement("div");
                            tooltipdiv.innerText = `${ipadd} : ${snex[x].BROKER[bk][0]}
                        TOTAL : ${snex[x].BROKER[bk][2]}
                        CLOSEWAIT : ${snex[x].BROKER[bk][4]}
                        ESTABLISHED : ${snex[x].BROKER[bk][5]}
                        TIMEWAIT : ${snex[x].BROKER[bk][3]}
                                                        `;
                            tooltipdiv.setAttribute("class", "tool_tip_div");
                            tdstatus.appendChild(tooltipdiv);

                            tdid = x + "_" + bk + "_td_BK";
                            tdstatus.setAttribute("id", tdid)
                            if (snex[x].BROKER[bk][6]) {
                                const por = snex[x].BROKER[bk][6]
                                function clickurl() {


                                    const url1 = "http://" + stip + ":" + por;
                                    var x = window.open(url1, '_blank')
                                    // console.log("OPENING URL>>>>")

                                }
                                tdstatus.ondblclick = clickurl;
                            }


                            MAINROW.appendChild(tdstatus);
                            tdstatus.appendChild(tooltipdiv);


                            if (snex[x].BROKER[bk][1] == 0) {
                                tdstatus.style.backgroundColor = "#d71111";
                                tdstatus.innerText = "DOWN"
                                div_order -= 2;

                            }
                            else {
                                tdstatus.style.backgroundColor = "#289b28";


                                if (snex[x].BROKER[bk][4] > 100) {

                                    tdstatus.style.backgroundColor = "coral";
                                    div_order -= 1;


                                }
                                if (snex[x].BROKER[bk][5] >= 50) {


                                    tdstatus.setAttribute("class", "wow shake infinite Est-above-50 ");
                                    div_order -= 100;
                                }
                            }




                            let maintable = document.getElementById(tablename + "_tb");
                            maintable.appendChild(MAINROW);
                        }
                        else {
                            //let td = x + bk + "_td";
                            let td = document.createElement("td");

                            tdid = x + "_" + bk + "_td_BK";

                            td.setAttribute("id", tdid)
                            td.innerText = snex[x].BROKER[bk][2] + "/" + snex[x].BROKER[bk][4];


                            let tooltipdiv = document.createElement("div");
                            let stip = snex[x].ip;
                            const ipar = stip.split(".")
                            let ipadd = ipar[3];
                            tooltipdiv.innerText = `${ipadd} : ${snex[x].BROKER[bk][0]}
                                                            TOTAL : ${snex[x].BROKER[bk][2]}
                                                            CLOSEWAIT : ${snex[x].BROKER[bk][4]}
                                                            ESTABLISHED : ${snex[x].BROKER[bk][5]}
                                                            TIMEWAIT : ${snex[x].BROKER[bk][3]}
                                                        `;
                            tooltipdiv.setAttribute("class", "tool_tip_div");
                            td.appendChild(tooltipdiv);
                            if (snex[x].BROKER[bk][6]) {
                                const por = snex[x].BROKER[bk][6]
                                function clickurl() {


                                    const url1 = "http://" + stip + ":" + por;
                                    var x = window.open(url1, '_blank')
                                    // console.log("OPENING URL>>>>")

                                }
                                td.ondblclick = clickurl;
                            }

                            if (snex[x].BROKER[bk][1] == 0) {
                                td.style.backgroundColor = "#d71111";
                                td.innerText = "DOWN";
                                div_order -= 2;

                            }
                            else {
                                td.style.backgroundColor = "#289b28";


                                if (snex[x].BROKER[bk][4] > 100) {
                                    td.style.backgroundColor = "coral";
                                    div_order -= 1;
                                }
                                if (snex[x].BROKER[bk][5] >= 50) {
                                    td.setAttribute("class", "wow shake infinite Est-above-50");
                                    div_order -= 100;
                                }
                            }
                            MAINROW.appendChild(td);
                            td.appendChild(tooltipdiv);

                        }

                    }
                }

                else {
                    // console.log(x + "does not exist")

                }
            }
            catch {

                // console.log(" kuch nhi karunga mai kyuki " + x + " to hai hi nhi ")

            }
            count++;

        }

        // console.log(count);
        // console.log(ROWs.length);

        // console.log("abhi count itna hai " + count);
        ROWs.forEach(row => {

            let ROWd = document.getElementById(row);

            let boxid = row.replace("_tr", "_td_BK");
            boxid = boxid.replace(tablename, x);
            // console.log(boxid);


            let BoxMain = document.getElementById(boxid);
            if (BoxMain == null) {
                let blank = document.createElement("td");
                // blank.style.backgroundColor = "black";
                try {
                    // let blank = document.createElement("td");
                    let chk1 = snex[x];

                    if (typeof chk1 == "object") {

                        // blank.innerText = "nodata"
                        blank.style.backgroundColor = "black";

                        // console.log("iska data tha to blank bhara")

                    }
                    else {
                        blank.innerText = "no data";
                        blank.style.backgroundColor = "black";
                        blank.style.color = "#ff5353";
                        blank.style.opacity = "1.0"
                        blank.setAttribute("class", "blinkbroker");



                    }
                }
                catch (err) {

                    // console.log("maine black bhara for the rest ");

                }

                //blank.style.border-collapse(collapse);
                try {
                    blank = document.createElement("td");
                    ROWd = document.getElementById(row);
                    blank.style.backgroundColor = "black";
                    ROWd.appendChild(blank);
                }
                catch {
                    console.log(`unable to print blank for ${row}`)

                }
            }

        }


        )

    })





    ///creating blanks in the middle of PR AND DR  if the thing is unified
    if (zone == 'UNIFIED') {

        //adding A empty td at the end to seperate pr and dr
        let thistable = document.getElementById(tablename + '_tablediv')
        let rows = thistable.getElementsByTagName('tr')
        const PRlength = PRarr.length;
        const ISO = /_zone/;
        // aceprsys09IP_th
        const HN = /IP_th/;
        for (let i = 0; i < rows.length; i++) {
            let empty_sep_td = document.createElement('td')
            // empty_sep_td.style.width = '10px'
            empty_sep_td.setAttribute('class', 'dividerdiv')
            let rowitem = rows[i];
            const id = rowitem.id;
            if (ISO.test(id)) {
                rowitem.insertBefore(empty_sep_td, rowitem.children[2])
            }
            else if (HN.test(id)) {
                const childnum = PRlength + 1;
                rowitem.insertBefore(empty_sep_td, rowitem.children[childnum])
            } else {
                const childnum = PRlength + 2;
                rowitem.insertBefore(empty_sep_td, rowitem.children[childnum])
            }
        }


    }






    ///// GIVING ORDER BASED ON STOPPED PORTS ie bk[0] = 0
    let maindiv_ordersetting = document.getElementById(tablename + "_tablediv");
    // console.log(tablename + "_tablediv");
    maindiv_ordersetting.style.order = div_order;


}


