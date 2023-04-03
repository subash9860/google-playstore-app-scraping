var gplay = require('google-play-scraper');

const fs = require('fs');

const filename = "appVersion.csv";
const writableStream = fs.createWriteStream(filename);

gplay.developer({ devId: 'Mobile Finance Technology' }).then((v) => {
    const data = "App Name, Last Updated Date, Version, URL\n";
    fs.writeFileSync('appVersion.csv', data, (err) => {
        if (err) {
            throw err;
        } else {
            console.log("Data has been written to file successfully.");
        }
    });

    v.forEach((a) => {
        let appId = a["appId"]
        // console.log(a)
        // console.log(appId)
        gplay.app({ appId: appId })
            .then((version) => {
                console.log(version)

                let date = new Date(version.updated).toDateString()

                let toWrite = `${version.title},${date},${version.version},${version.url.split("&")[0]}\n`
                console.log(toWrite)


                fs.appendFileSync('appVersion.csv', toWrite, (err) => {
                    if (err) {
                        throw err;
                    } else {
                        console.log("Data has been written to file successfully.");
                    }
                });


                // cvs.stringify(a, {
                //     header: true,
                //     columns: 
                // {
                //         title: 'Sarvamanya - MoFin',
                //         appId: 'com.mofin.sarvamanya',
                //         url: 'https://play.google.com/store/apps/details?id=com.mofin.sarvamanya',
                //         icon: 'https://play-lh.googleusercontent.com/m2C21Mn12TBnjQi_ib2RV9JvxhvT8Brm7YLfP39szpdXAUyEDevoTdk4D0BAFSo6uts',
                //         developer: 'Mobile Finance Technology',
                //         developerId: 'Mobile+Finance+Technology',
                //         priceText: 'FREE',
                //         currency: undefined,
                //         price: 0,
                //         free: true,
                //         summary: 'Mobile finance app for Sarvamanya',
                //         scoreText: '0.0',
                //         score: 0
                //     },
                // }, (err, a) => {
                //     fs.writeFileSync("test.csv", a);
                //     console.log("OK");
                // });

                // console.log(version)

            });
    })
});


