const canvas = document.querySelector('#wall');
const ctx = canvas.getContext('2d');

let loaded = 0;

const WALL_SPRITE = new Image();
WALL_SPRITE.src = './images/wall/wall.png';
WALL_SPRITE.onload = imageLoaded;

const HOLDS_SPRITE = new Image();
HOLDS_SPRITE.src = './images/wall/holds.png';
HOLDS_SPRITE.onload = imageLoaded;

const START_SPRITE = new Image();
START_SPRITE.src = './images/wall/start.png';
START_SPRITE.onload = imageLoaded;

const START_DOUBLE_SPRITE = new Image();
START_DOUBLE_SPRITE.src = './images/wall/start-double.png';
START_DOUBLE_SPRITE.onload = imageLoaded;

const TOP_SPRITE = new Image();
TOP_SPRITE.src = './images/wall/top.png';
TOP_SPRITE.onload = imageLoaded;

const holdsPositions = {"a1":{"top":1374,"bottom":1394,"left":70,"right":90},"a11":{"top":938,"bottom":976,"left":45,"right":92},"a13":{"top":837,"bottom":883,"left":60,"right":87},"a15":{"top":750,"bottom":800,"left":35,"right":98},"a18":{"top":633,"bottom":670,"left":50,"right":100},"a16":{"top":717,"bottom":757,"left":24,"right":94},"a17":{"top":675,"bottom":710,"left":51,"right":96},"a21":{"top":496,"bottom":541,"left":57,"right":104},"a19":{"top":594,"bottom":611,"left":64,"right":86},"a20":{"top":537,"bottom":577,"left":45,"right":90},"a26":{"top":262,"bottom":315,"left":38,"right":96},"a22":{"top":442,"bottom":498,"left":34,"right":92},"a30":{"top":97,"bottom":138,"left":57,"right":95},"a24":{"top":360,"bottom":401,"left":47,"right":99},"a4":{"top":1243,"bottom":1266,"left":64,"right":89},"a31":{"top":4,"bottom":96,"left":24,"right":111},"a9":{"top":1022,"bottom":1042,"left":68,"right":89},"a7":{"top":1107,"bottom":1137,"left":64,"right":93},"a5":{"top":1198,"bottom":1223,"left":65,"right":90},"b12":{"top":883,"bottom":922,"left":90,"right":134},"b11":{"top":935,"bottom":983,"left":102,"right":145},"b10":{"top":983,"bottom":1015,"left":100,"right":144},"b15":{"top":766,"bottom":799,"left":101,"right":141},"b14":{"top":811,"bottom":843,"left":101,"right":136},"b13":{"top":856,"bottom":875,"left":96,"right":139},"b19":{"top":588,"bottom":617,"left":104,"right":141},"b17":{"top":669,"bottom":717,"left":90,"right":126},"b18":{"top":633,"bottom":658,"left":100,"right":139},"b22":{"top":459,"bottom":490,"left":97,"right":132},"b20":{"top":542,"bottom":584,"left":98,"right":133},"b21":{"top":488,"bottom":543,"left":96,"right":143},"b26":{"top":256,"bottom":311,"left":87,"right":145},"b25":{"top":312,"bottom":354,"left":90,"right":147},"b23":{"top":396,"bottom":447,"left":94,"right":141},"b27":{"top":231,"bottom":260,"left":101,"right":138},"b29":{"top":128,"bottom":180,"left":88,"right":138},"b28":{"top":181,"bottom":228,"left":84,"right":136},"b5":{"top":1195,"bottom":1221,"left":110,"right":134},"b30":{"top":77,"bottom":144,"left":91,"right":152},"b3":{"top":1287,"bottom":1315,"left":114,"right":131},"b8":{"top":1066,"bottom":1091,"left":106,"right":137},"c11":{"top":925,"bottom":979,"left":162,"right":218},"c1":{"top":1380,"bottom":1399,"left":177,"right":197},"c12":{"top":896,"bottom":927,"left":168,"right":205},"c13":{"top":849,"bottom":880,"left":172,"right":211},"c14.5":{"top":781,"bottom":816,"left":207,"right":241},"c14":{"top":816,"bottom":835,"left":176,"right":200},"c16":{"top":718,"bottom":758,"left":165,"right":203},"c15":{"top":754,"bottom":806,"left":161,"right":216},"c18":{"top":621,"bottom":675,"left":162,"right":218},"c19":{"top":579,"bottom":618,"left":136,"right":234},"c17":{"top":673,"bottom":711,"left":165,"right":221},"c21":{"top":489,"bottom":552,"left":156,"right":231},"c20":{"top":544,"bottom":580,"left":167,"right":207},"c20.5":{"top":533,"bottom":545,"left":196,"right":253},"c24":{"top":352,"bottom":408,"left":164,"right":213},"c22":{"top":449,"bottom":502,"left":161,"right":217},"c23":{"top":411,"bottom":459,"left":160,"right":217},"c25":{"top":313,"bottom":359,"left":163,"right":210},"c27":{"top":220,"bottom":278,"left":161,"right":218},"c26":{"top":269,"bottom":307,"left":166,"right":209},"c3":{"top":1289,"bottom":1307,"left":179,"right":196},"c29":{"top":143,"bottom":183,"left":166,"right":209},"c28":{"top":192,"bottom":218,"left":169,"right":205},"c7":{"top":1094,"bottom":1151,"left":161,"right":218},"c31":{"top":53,"bottom":107,"left":166,"right":209},"c6":{"top":1153,"bottom":1178,"left":175,"right":204},"d10":{"top":981,"bottom":1027,"left":232,"right":270},"d1":{"top":1373,"bottom":1396,"left":244,"right":266},"c9":{"top":999,"bottom":1068,"left":160,"right":235},"d13":{"top":836,"bottom":875,"left":231,"right":274},"d12":{"top":892,"bottom":931,"left":230,"right":272},"d14":{"top":812,"bottom":857,"left":225,"right":262},"d17":{"top":669,"bottom":706,"left":219,"right":272},"d15":{"top":768,"bottom":791,"left":239,"right":265},"d16":{"top":708,"bottom":768,"left":220,"right":280},"d19":{"top":578,"bottom":619,"left":237,"right":279},"d20":{"top":548,"bottom":579,"left":232,"right":279},"d18":{"top":640,"bottom":664,"left":239,"right":274},"d22":{"top":447,"bottom":504,"left":244,"right":291},"d21":{"top":499,"bottom":532,"left":222,"right":276},"d23":{"top":407,"bottom":450,"left":227,"right":280},"d24":{"top":370,"bottom":390,"left":217,"right":255},"d26":{"top":287,"bottom":315,"left":210,"right":262},"d25":{"top":316,"bottom":362,"left":236,"right":282},"d28":{"top":187,"bottom":222,"left":228,"right":274},"d27":{"top":225,"bottom":281,"left":228,"right":276},"d29":{"top":149,"bottom":182,"left":214,"right":248},"d5":{"top":1201,"bottom":1220,"left":245,"right":265},"d31":{"top":35,"bottom":87,"left":222,"right":276},"d4":{"top":1239,"bottom":1267,"left":238,"right":269},"d7":{"top":1109,"bottom":1155,"left":229,"right":275},"e10":{"top":978,"bottom":1018,"left":277,"right":321},"d8":{"top":1061,"bottom":1090,"left":239,"right":264},"e15":{"top":751,"bottom":795,"left":278,"right":310},"e12":{"top":882,"bottom":924,"left":275,"right":314},"e14":{"top":795,"bottom":864,"left":257,"right":316},"e16":{"top":720,"bottom":748,"left":279,"right":313},"e18":{"top":622,"bottom":676,"left":274,"right":327},"e19":{"top":574,"bottom":596,"left":270,"right":298},"e20":{"top":542,"bottom":573,"left":279,"right":314},"e22":{"top":462,"bottom":488,"left":285,"right":315},"e23":{"top":418,"bottom":439,"left":283,"right":314},"e27":{"top":236,"bottom":265,"left":276,"right":311},"e25":{"top":295,"bottom":353,"left":269,"right":317},"e24":{"top":369,"bottom":404,"left":282,"right":310},"e28":{"top":172,"bottom":237,"left":272,"right":322},"e3":{"top":1285,"bottom":1311,"left":285,"right":311},"e29":{"top":130,"bottom":171,"left":276,"right":311},"e7":{"top":1108,"bottom":1135,"left":285,"right":312},"e5":{"top":1201,"bottom":1220,"left":286,"right":312},"e31":{"top":52,"bottom":87,"left":281,"right":315},"f12":{"top":882,"bottom":930,"left":314,"right":363},"f11":{"top":937,"bottom":971,"left":316,"right":358},"f1":{"top":1375,"bottom":1402,"left":331,"right":350},"f14":{"top":804,"bottom":845,"left":325,"right":350},"f15":{"top":763,"bottom":796,"left":332,"right":350},"f16":{"top":712,"bottom":758,"left":316,"right":365},"f19":{"top":583,"bottom":628,"left":328,"right":360},"f17":{"top":684,"bottom":702,"left":325,"right":355},"f18":{"top":634,"bottom":663,"left":327,"right":361},"f22":{"top":455,"bottom":492,"left":328,"right":349},"f21":{"top":499,"bottom":543,"left":305,"right":363},"f20":{"top":572,"bottom":596,"left":309,"right":338},"f24":{"top":368,"bottom":404,"left":327,"right":358},"f23":{"top":414,"bottom":440,"left":325,"right":357},"f25":{"top":317,"bottom":346,"left":326,"right":362},"f26":{"top":278,"bottom":299,"left":330,"right":351},"f29":{"top":129,"bottom":186,"left":310,"right":372},"f27":{"top":233,"bottom":258,"left":329,"right":355},"f31":{"top":34,"bottom":103,"left":316,"right":360},"f7":{"top":1115,"bottom":1133,"left":330,"right":349},"f5":{"top":1199,"bottom":1221,"left":330,"right":350},"f9":{"top":1022,"bottom":1060,"left":320,"right":362},"g10":{"top":984,"bottom":1017,"left":376,"right":391},"g1":{"top":1373,"bottom":1395,"left":374,"right":393},"g11":{"top":938,"bottom":970,"left":363,"right":401},"g13":{"top":840,"bottom":881,"left":371,"right":398},"g14":{"top":802,"bottom":845,"left":367,"right":408},"g15":{"top":767,"bottom":793,"left":370,"right":397},"g16.5":{"top":699,"bottom":740,"left":408,"right":439},"g16":{"top":722,"bottom":748,"left":365,"right":403},"g18.5":{"top":607,"bottom":634,"left":402,"right":435},"g17":{"top":675,"bottom":703,"left":367,"right":409},"g18":{"top":635,"bottom":658,"left":368,"right":397},"g20":{"top":536,"bottom":588,"left":340,"right":426},"g19":{"top":589,"bottom":619,"left":370,"right":400},"g19.5":{"top":578,"bottom":587,"left":396,"right":435},"g25":{"top":306,"bottom":345,"left":358,"right":403},"g22":{"top":418,"bottom":521,"left":350,"right":424},"g24":{"top":366,"bottom":403,"left":365,"right":405},"g28":{"top":186,"bottom":219,"left":372,"right":405},"g3":{"top":1287,"bottom":1308,"left":371,"right":402},"g26":{"top":247,"bottom":295,"left":338,"right":409},"g31":{"top":6,"bottom":90,"left":349,"right":407},"g5":{"top":1194,"bottom":1223,"left":371,"right":397},"g7":{"top":1107,"bottom":1133,"left":370,"right":394},"h11":{"top":925,"bottom":981,"left":421,"right":477},"h12":{"top":872,"bottom":930,"left":425,"right":495},"g8":{"top":1068,"bottom":1095,"left":372,"right":394},"h1":{"top":1364,"bottom":1408,"left":429,"right":469},"h15":{"top":752,"bottom":807,"left":423,"right":477},"h16":{"top":726,"bottom":754,"left":432,"right":464},"h14":{"top":809,"bottom":843,"left":405,"right":497},"h18":{"top":621,"bottom":676,"left":424,"right":479},"h17":{"top":677,"bottom":711,"left":432,"right":468},"h19":{"top":582,"bottom":620,"left":427,"right":463},"h22":{"top":446,"bottom":502,"left":423,"right":479},"h21":{"top":495,"bottom":521,"left":467,"right":498},"h20":{"top":517,"bottom":582,"left":430,"right":473},"h23":{"top":425,"bottom":457,"left":453,"right":494},"h25":{"top":297,"bottom":352,"left":422,"right":478},"h24":{"top":373,"bottom":425,"left":433,"right":472},"h26":{"top":275,"bottom":295,"left":461,"right":502},"h28":{"top":169,"bottom":216,"left":429,"right":468},"h27":{"top":220,"bottom":277,"left":422,"right":479},"h30":{"top":92,"bottom":148,"left":424,"right":479},"h31":{"top":38,"bottom":100,"left":427,"right":474},"h29":{"top":134,"bottom":172,"left":435,"right":463},"h6":{"top":1155,"bottom":1182,"left":440,"right":458},"h5":{"top":1197,"bottom":1222,"left":435,"right":457},"h7":{"top":1095,"bottom":1151,"left":423,"right":477},"i10":{"top":980,"bottom":1008,"left":498,"right":534},"i11":{"top":946,"bottom":970,"left":481,"right":545},"h9":{"top":1028,"bottom":1049,"left":439,"right":457},"i12":{"top":890,"bottom":937,"left":490,"right":539},"i14":{"top":806,"bottom":834,"left":501,"right":536},"i15":{"top":772,"bottom":799,"left":495,"right":536},"i16":{"top":708,"bottom":751,"left":493,"right":537},"i17":{"top":674,"bottom":709,"left":492,"right":543},"i18":{"top":636,"bottom":657,"left":500,"right":531},"i2":{"top":1330,"bottom":1354,"left":505,"right":526},"i19":{"top":585,"bottom":633,"left":498,"right":534},"i20":{"top":550,"bottom":617,"left":463,"right":563},"i22":{"top":418,"bottom":512,"left":491,"right":542},"i21":{"top":501,"bottom":531,"left":506,"right":531},"i24":{"top":359,"bottom":416,"left":485,"right":543},"i25":{"top":304,"bottom":357,"left":485,"right":538},"i26":{"top":274,"bottom":305,"left":497,"right":533},"i27":{"top":215,"bottom":259,"left":498,"right":526},"i29":{"top":141,"bottom":178,"left":464,"right":569},"i28":{"top":188,"bottom":223,"left":498,"right":543},"i31":{"top":42,"bottom":100,"left":495,"right":537},"i5":{"top":1195,"bottom":1226,"left":503,"right":530},"i7":{"top":1100,"bottom":1159,"left":487,"right":544},"i9":{"top":1027,"bottom":1062,"left":631,"right":666},"j1":{"top":1374,"bottom":1399,"left":551,"right":569},"j10":{"top":970,"bottom":1048,"left":540,"right":587},"j12":{"top":897,"bottom":942,"left":543,"right":574},"j14":{"top":798,"bottom":831,"left":535,"right":582},"j15":{"top":759,"bottom":800,"left":536,"right":587},"j16":{"top":719,"bottom":759,"left":530,"right":584},"j17":{"top":673,"bottom":715,"left":543,"right":574},"j18":{"top":620,"bottom":661,"left":541,"right":576},"j21":{"top":501,"bottom":530,"left":539,"right":581},"j22":{"top":467,"bottom":488,"left":546,"right":576},"j23":{"top":407,"bottom":452,"left":536,"right":588},"j30":{"top":62,"bottom":147,"left":543,"right":596},"j24":{"top":361,"bottom":409,"left":546,"right":573},"j27":{"top":208,"bottom":272,"left":540,"right":591},"j4":{"top":1244,"bottom":1262,"left":549,"right":571},"j31":{"top":34,"bottom":61,"left":536,"right":573},"j5":{"top":1201,"bottom":1219,"left":553,"right":568},"j8":{"top":1066,"bottom":1093,"left":545,"right":572},"k10":{"top":981,"bottom":1014,"left":589,"right":621},"k1":{"top":1376,"bottom":1395,"left":591,"right":610},"k11":{"top":935,"bottom":975,"left":581,"right":621},"k13":{"top":845,"bottom":881,"left":580,"right":626},"k15":{"top":763,"bottom":792,"left":587,"right":618},"k14":{"top":798,"bottom":834,"left":588,"right":625},"k18":{"top":606,"bottom":690,"left":571,"right":640},"k16":{"top":724,"bottom":743,"left":588,"right":623},"k20":{"top":534,"bottom":586,"left":581,"right":630},"k23":{"top":408,"bottom":441,"left":582,"right":623},"k24":{"top":365,"bottom":408,"left":578,"right":620},"k22":{"top":450,"bottom":519,"left":571,"right":619},"k31":{"top":6,"bottom":88,"left":578,"right":623},"k26":{"top":251,"bottom":307,"left":584,"right":627},"k28":{"top":178,"bottom":220,"left":594,"right":618},"k7":{"top":1113,"bottom":1143,"left":593,"right":611},"k8":{"top":1060,"bottom":1098,"left":579,"right":623},"k5":{"top":1199,"bottom":1224,"left":589,"right":613},"l12":{"top":892,"bottom":934,"left":618,"right":670},"l13":{"top":848,"bottom":891,"left":627,"right":669},"l11":{"top":919,"bottom":999,"left":623,"right":668},"l17":{"top":677,"bottom":717,"left":618,"right":670},"l15":{"top":761,"bottom":797,"left":617,"right":671},"l16":{"top":721,"bottom":750,"left":634,"right":662},"l19":{"top":580,"bottom":623,"left":626,"right":670},"l18":{"top":642,"bottom":662,"left":634,"right":663},"l20":{"top":538,"bottom":582,"left":626,"right":670},"l22":{"top":458,"bottom":488,"left":634,"right":664},"l23":{"top":418,"bottom":442,"left":627,"right":658},"l21":{"top":497,"bottom":535,"left":629,"right":671},"l25":{"top":303,"bottom":347,"left":634,"right":663},"l27":{"top":210,"bottom":245,"left":614,"right":663},"l24":{"top":361,"bottom":411,"left":620,"right":675},"l26":{"top":258,"bottom":300,"left":623,"right":665},"l28":{"top":189,"bottom":214,"left":637,"right":664},"l29":{"top":133,"bottom":177,"left":617,"right":669},"l3":{"top":1270,"bottom":1312,"left":627,"right":664},"l5":{"top":1188,"bottom":1238,"left":624,"right":661},"l30":{"top":93,"bottom":138,"left":628,"right":670},"l31":{"top":62,"bottom":86,"left":636,"right":655},"m11":{"top":924,"bottom":979,"left":661,"right":715},"m10":{"top":976,"bottom":1012,"left":675,"right":704},"m1":{"top":1375,"bottom":1395,"left":678,"right":697},"m15":{"top":749,"bottom":803,"left":664,"right":718},"m14":{"top":810,"bottom":840,"left":656,"right":730},"m16":{"top":721,"bottom":752,"left":665,"right":716},"m18":{"top":619,"bottom":674,"left":664,"right":718},"m17":{"top":680,"bottom":705,"left":676,"right":704},"m17.5":{"top":660,"bottom":681,"left":699,"right":736},"m21":{"top":504,"bottom":536,"left":663,"right":720},"m19":{"top":591,"bottom":614,"left":672,"right":709},"m20":{"top":539,"bottom":584,"left":671,"right":713},"m24":{"top":355,"bottom":404,"left":674,"right":714},"m23":{"top":409,"bottom":445,"left":664,"right":719},"m22":{"top":445,"bottom":501,"left":661,"right":713},"m25":{"top":314,"bottom":352,"left":672,"right":711},"m26":{"top":294,"bottom":307,"left":690,"right":727},"m27":{"top":217,"bottom":273,"left":662,"right":719},"m29":{"top":102,"bottom":176,"left":671,"right":712},"m31":{"top":21,"bottom":89,"left":671,"right":716},"m28":{"top":175,"bottom":215,"left":665,"right":706},"m7":{"top":1096,"bottom":1152,"left":660,"right":717},"m6":{"top":1159,"bottom":1178,"left":675,"right":698},"m4":{"top":1245,"bottom":1267,"left":671,"right":702},"n1":{"top":1364,"bottom":1405,"left":716,"right":751},"m8":{"top":1058,"bottom":1098,"left":664,"right":714},"n10":{"top":967,"bottom":1024,"left":703,"right":763},"n15":{"top":761,"bottom":799,"left":715,"right":757},"n12":{"top":879,"bottom":924,"left":709,"right":760},"n13":{"top":839,"bottom":863,"left":720,"right":752},"n18":{"top":621,"bottom":671,"left":715,"right":756},"n17":{"top":679,"bottom":714,"left":706,"right":765},"n19":{"top":587,"bottom":619,"left":720,"right":751},"n20":{"top":536,"bottom":558,"left":716,"right":768},"n21":{"top":504,"bottom":533,"left":718,"right":754},"n22":{"top":443,"bottom":503,"left":703,"right":762},"n25":{"top":322,"bottom":352,"left":708,"right":761},"n24":{"top":367,"bottom":403,"left":716,"right":756},"n23":{"top":419,"bottom":437,"left":724,"right":747},"n28":{"top":178,"bottom":221,"left":709,"right":760},"n29":{"top":136,"bottom":173,"left":721,"right":753},"n27":{"top":215,"bottom":264,"left":714,"right":762},"n31":{"top":10,"bottom":87,"left":719,"right":758},"n5":{"top":1186,"bottom":1253,"left":709,"right":749},"n3":{"top":1285,"bottom":1313,"left":721,"right":750},"o11":{"top":926,"bottom":968,"left":764,"right":795},"n8":{"top":1070,"bottom":1092,"left":721,"right":745},"o13":{"top":847,"bottom":881,"left":757,"right":806},"o15":{"top":760,"bottom":813,"left":760,"right":809},"o19":{"top":569,"bottom":646,"left":750,"right":808},"o16":{"top":711,"bottom":754,"left":748,"right":805},"o22":{"top":450,"bottom":494,"left":767,"right":791},"o21":{"top":509,"bottom":529,"left":762,"right":801},"o27":{"top":231,"bottom":266,"left":763,"right":800},"o28":{"top":183,"bottom":216,"left":763,"right":792},"o30":{"top":67,"bottom":143,"left":746,"right":809},"o4":{"top":1242,"bottom":1265,"left":766,"right":786},"p1":{"top":1377,"bottom":1398,"left":807,"right":830},"o7":{"top":1108,"bottom":1166,"left":751,"right":807},"o9":{"top":1012,"bottom":1064,"left":750,"right":799},"p12":{"top":887,"bottom":921,"left":802,"right":843},"p10":{"top":960,"bottom":1024,"left":791,"right":849},"p13":{"top":840,"bottom":865,"left":803,"right":842},"p15":{"top":769,"bottom":805,"left":803,"right":849},"p17":{"top":623,"bottom":720,"left":764,"right":845},"p19":{"top":596,"bottom":627,"left":811,"right":845},"p20":{"top":549,"bottom":578,"left":809,"right":847},"p21":{"top":500,"bottom":534,"left":806,"right":843},"p25":{"top":291,"bottom":396,"left":751,"right":874},"p22":{"top":442,"bottom":483,"left":794,"right":840},"p26":{"top":269,"bottom":309,"left":806,"right":839},"p27":{"top":211,"bottom":259,"left":798,"right":851},"p29":{"top":121,"bottom":173,"left":792,"right":850},"p3":{"top":1289,"bottom":1316,"left":807,"right":830},"p31":{"top":28,"bottom":84,"left":801,"right":851},"p5":{"top":1201,"bottom":1226,"left":808,"right":832},"q11":{"top":929,"bottom":980,"left":838,"right":888},"p7":{"top":1114,"bottom":1137,"left":805,"right":837},"q1":{"top":1379,"bottom":1397,"left":857,"right":875},"q13":{"top":853,"bottom":885,"left":831,"right":894},"q15":{"top":757,"bottom":802,"left":848,"right":897},"q17":{"top":663,"bottom":738,"left":848,"right":897},"q20":{"top":547,"bottom":584,"left":836,"right":889},"q18":{"top":638,"bottom":664,"left":839,"right":886},"q19":{"top":578,"bottom":629,"left":851,"right":880},"q22":{"top":450,"bottom":494,"left":853,"right":891},"q23":{"top":399,"bottom":456,"left":839,"right":897},"q21":{"top":492,"bottom":535,"left":840,"right":887},"q27":{"top":231,"bottom":284,"left":843,"right":890},"q29":{"top":132,"bottom":173,"left":845,"right":908},"q31":{"top":52,"bottom":80,"left":846,"right":889},"q7":{"top":1113,"bottom":1134,"left":849,"right":873},"q5":{"top":1200,"bottom":1225,"left":849,"right":876},"q9":{"top":1022,"bottom":1056,"left":847,"right":887},"r12":{"top":866,"bottom":956,"left":895,"right":927},"r14":{"top":800,"bottom":848,"left":874,"right":942},"r16":{"top":711,"bottom":749,"left":886,"right":933},"r19":{"top":586,"bottom":625,"left":891,"right":953},"r18":{"top":622,"bottom":644,"left":893,"right":919},"r17":{"top":676,"bottom":710,"left":891,"right":938},"r22":{"top":457,"bottom":498,"left":887,"right":931},"r2":{"top":1332,"bottom":1366,"left":893,"right":928},"r21":{"top":496,"bottom":535,"left":893,"right":942},"r23":{"top":413,"bottom":440,"left":906,"right":943},"r25":{"top":318,"bottom":341,"left":899,"right":925},"r24":{"top":347,"bottom":375,"left":873,"right":927},"r28":{"top":165,"bottom":240,"left":883,"right":957},"r3":{"top":1290,"bottom":1315,"left":899,"right":918},"r26":{"top":245,"bottom":310,"left":864,"right":934},"r6":{"top":1135,"bottom":1209,"left":876,"right":948},"s1":{"top":1379,"bottom":1401,"left":939,"right":965},"r8":{"top":1053,"bottom":1092,"left":888,"right":935},"r31":{"top":20,"bottom":103,"left":886,"right":953},"s10":{"top":970,"bottom":1020,"left":914,"right":987},"s15":{"top":750,"bottom":806,"left":923,"right":974},"s11":{"top":926,"bottom":980,"left":921,"right":978},"s16":{"top":725,"bottom":753,"left":933,"right":967},"s17":{"top":675,"bottom":710,"left":925,"right":971},"s18":{"top":618,"bottom":675,"left":924,"right":979},"s22":{"top":445,"bottom":502,"left":927,"right":981},"s19":{"top":593,"bottom":620,"left":947,"right":977},"s20":{"top":552,"bottom":587,"left":921,"right":984},"s24":{"top":352,"bottom":408,"left":928,"right":983},"s27":{"top":217,"bottom":275,"left":923,"right":981},"s25":{"top":308,"bottom":349,"left":935,"right":983},"s7":{"top":1096,"bottom":1152,"left":923,"right":980},"s8":{"top":1065,"bottom":1094,"left":941,"right":974},"s29":{"top":129,"bottom":181,"left":933,"right":980},"t16":{"top":713,"bottom":763,"left":975,"right":1026},"t14":{"top":805,"bottom":844,"left":974,"right":1018},"t12":{"top":878,"bottom":936,"left":965,"right":1028},"t20":{"top":562,"bottom":589,"left":993,"right":1024},"t19":{"top":594,"bottom":637,"left":987,"right":1026},"t17":{"top":661,"bottom":715,"left":967,"right":1027},"t21":{"top":494,"bottom":543,"left":973,"right":1027},"t23":{"top":413,"bottom":468,"left":977,"right":1055},"t25":{"top":306,"bottom":349,"left":982,"right":1025},"t27":{"top":232,"bottom":262,"left":985,"right":1017},"t28":{"top":173,"bottom":232,"left":978,"right":1023},"t3":{"top":1290,"bottom":1309,"left":986,"right":1005},"t31":{"top":51,"bottom":99,"left":976,"right":1029},"t5":{"top":1181,"bottom":1234,"left":971,"right":1016},"t8":{"top":1065,"bottom":1098,"left":976,"right":1012},"u14":{"top":789,"bottom":859,"left":1013,"right":1066},"u16":{"top":724,"bottom":753,"left":1017,"right":1061},"u10":{"top":980,"bottom":1017,"left":1020,"right":1074},"u20":{"top":540,"bottom":579,"left":1026,"right":1061},"u17":{"top":683,"bottom":707,"left":1028,"right":1060},"u19":{"top":573,"bottom":634,"left":1024,"right":1072},"u24":{"top":373,"bottom":397,"left":1032,"right":1060},"u26":{"top":264,"bottom":312,"left":1033,"right":1076},"u22":{"top":447,"bottom":494,"left":1024,"right":1074},"u8":{"top":1067,"bottom":1098,"left":1022,"right":1065},"u5":{"top":1197,"bottom":1224,"left":1027,"right":1050},"u29":{"top":142,"bottom":177,"left":1014,"right":1074},"v11":{"top":911,"bottom":978,"left":1060,"right":1134},"v1":{"top":1370,"bottom":1405,"left":1064,"right":1099},"v13":{"top":850,"bottom":891,"left":1066,"right":1105},"v15":{"top":753,"bottom":823,"left":1052,"right":1124},"v17":{"top":679,"bottom":742,"left":1055,"right":1125},"v18":{"top":617,"bottom":677,"left":1059,"right":1118},"v20":{"top":551,"bottom":575,"left":1069,"right":1100},"v23":{"top":414,"bottom":460,"left":1057,"right":1114},"v21":{"top":507,"bottom":533,"left":1075,"right":1111},"v24":{"top":364,"bottom":411,"left":1056,"right":1110},"v5":{"top":1205,"bottom":1223,"left":1073,"right":1095},"v3":{"top":1290,"bottom":1315,"left":1074,"right":1106},"v6":{"top":1157,"bottom":1183,"left":1069,"right":1102},"v8":{"top":1069,"bottom":1102,"left":1075,"right":1096}};

const PASTILLE_SIZE = 90;

function drawWall(boulder, otherHolds = true) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // background
  ctx.drawImage(WALL_SPRITE, 0, 0, canvas.width, canvas.height);
  if (otherHolds) {
    ctx.drawImage(HOLDS_SPRITE, 0, 0, canvas.width, canvas.height);
  }

  let boulderPositions = [];
  let startPositions = [];
  let topPosition = {};

  //region PASTILLES
  for (let hold of Object.keys(boulder)) {
    const position = holdsPositions[hold];

    boulderPositions.push(position);

    if (boulder[hold] === 1) {
      startPositions.push(position);
    }

    if (boulder[hold] === 2) {
      topPosition = position;
    }
  }

  // start
  for (let startPosition of startPositions) {
    testedPos = {x: startPosition.right + 10, y: startPosition.bottom + 30}

    while (testPosition(boulderPositions, testedPos)) {
      testedPos.x -= 5;
    }

    // line
    ctx.lineWidth = PASTILLE_SIZE / 30;
    ctx.beginPath();
    ctx.moveTo(testedPos.x + PASTILLE_SIZE / 2, testedPos.y + PASTILLE_SIZE / 2);
    ctx.lineTo((startPosition.left + startPosition.right) / 2, (startPosition.top + startPosition.bottom) / 2);

    ctx.stroke();

    ctx.drawImage(startPositions.length === 1 ? START_DOUBLE_SPRITE : START_SPRITE, testedPos.x, testedPos.y, PASTILLE_SIZE, PASTILLE_SIZE);
  }

  // top
  testedPos = {x: topPosition.right + 10, y: topPosition.bottom + 30}

  while (testPosition(boulderPositions, testedPos)) {
    testedPos.x -= 5;
  }

  // line
  ctx.lineWidth = PASTILLE_SIZE / 30;
  ctx.beginPath();
  ctx.moveTo(testedPos.x + PASTILLE_SIZE / 2, testedPos.y + PASTILLE_SIZE / 2);
  ctx.lineTo((topPosition.left + topPosition.right) / 2, (topPosition.top + topPosition.bottom) / 2);

  ctx.stroke();

  ctx.drawImage(TOP_SPRITE, testedPos.x, testedPos.y, PASTILLE_SIZE, PASTILLE_SIZE);
  //endregion

  //region HOLDS
  for (let hold of Object.keys(boulder)) {
    const holdSprite = new Image();
    holdSprite.src = `./images/wall/holds/${hold}.png`;
    holdSprite.onload = () => {
      ctx.drawImage(holdSprite, 0, 0, canvas.width, canvas.height);
    }
  }
  //endregion
}

function testPosition(holdsPos, testedPos) {
  // hors ecran
  if (testedPos.x < 0) {
    return false;
  }
  if (testedPos.x + PASTILLE_SIZE > canvas.width) {
    return true;
  }

  // Définir les limites du carré
  const square = {
    top: testedPos.y,
    bottom: testedPos.y + PASTILLE_SIZE,
    left: testedPos.x,
    right: testedPos.x + PASTILLE_SIZE
  };

  // Vérifier si le carré est entièrement à l'intérieur d'un rectangle de la liste
  return holdsPos.some(rect =>
    square.right > rect.left &&
    square.left < rect.right &&
    square.bottom > rect.top &&
    square.top < rect.bottom
  );
}

function imageLoaded() {
  loaded++;
  if (loaded === 5) {
    document.dispatchEvent(new CustomEvent('loaded-images'));
  }
}