/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  Font1,
  Font1Interface,
} from "../../../../contracts/lib/Fonts.sol/Font1";

const _abi = [
  {
    inputs: [],
    name: "font",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6128ea61003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600436106100355760003560e01c80639d37bc7c1461003a575b600080fd5b610042610058565b60405161004f919061007b565b60405180910390f35b60606040518061282001604052806127e481526020016100d16127e49139905090565b600060208083528351808285015260005b818110156100a85785810183015185820160400152820161008c565b818111156100ba576000604083870101525b50601f01601f191692909201604001939250505056fe643039474d6741424141414141452b6b4142414141414141337951414145394441414d41516741414141414141414141414141414141414141414141414141414734475566675a674149556d43436f4a676e4d52464171427a47694274524953747951424e67496b413470774334566741415167425959594279414d67556b6256633958496e6537743568556f4c79424a663357713132746d6e4358672f4e49434f4761303152304941626441666976706971652f662f2f663259796b634e794b58644a61796a594e762b4d6e685165495a4a5761374a4254676c434b666d792b5757786346725a3534772b6b574b594c4779467667576b625457386c4d715351487037794949484d6f6c5a54634b743255453843324a416c71344e6a6d324a576e36576335437a677135724d30493276355a7a4f4c6d786447656d625066654f7a5a5134575278376330364a4b5444337279354f682f37617242713948354346565a5042546b6250646f394d713066307838452f6d4f716d4d4d337547697264566763796957744f2b4672754b63587644666e536638657a61507771747949306445506a766532353854565569662b696934373442352b685931724544566d366568583470386642392b632b3737494e664a753277696f4f59454d5452574d6d39595a54422f33694461726d7034655a515979694158595165556b4959514d4c4553566862766c79475531652b2b38694c42766e47486e726d74472f3853467676316e455974454c4270507172564f70794939594c3442666d332b6f665142423064644e6e465633743237694943376732767752434b745a424d4c335844467847434b396e65736a4d33466e5a386c63345573553164594b346257744d365a47763067354c4f784c2b774251307151416c2b53416f6661626d6768797a674c413474303262453542697265417a79662b3332652b344232533567756f774f45704153736c70524f58566f57736b4a56733543647a7750384f487344454f4b46334d39526f57302b435839796136696c373162687a31625062716a375879436b626748384a3044412f35464f76572f35666930436a414767735a7533456d3042414b454278553759357066552f2f54395877665657624c554c636c4e746e476e47516947784254546b67363572323171382f62543049663135752f54397636545476306e42662b54437278333638533041683034756741374b615064737232476b4d7362486675746a392b567349424a524b7958645263414b4f49734a3133765252516f2f774d41654b712f734166596b5567414177313277696372454c646473536b6677642b41436c38452b662b506739564d453068456859734a4c7043642b37374a73474b315a4c3445364a3761674141436f4b47304b38336c705173414c31436831526e546f596b6b676564355150696d4378372b702f327937326249345966574a633952326767332f31733130336e7a434b5748316b4d506658346f76556c7770556f65506251652b6c4233485a4b7a617632715057764d436d4e58754a312f5663325649415358727251713337335768386d3856706e307662526877762f34482f5448353263564a494751374e42306f2b684774544f6c73783849556a714131506d70584e4756336b6e4a69695862562b527256656c39764e716d314c4c7363695a6e3832584b6d47473862426d7a5a3130795a7379594b7a5858656c6476714f50306a6b3339397069656f6567596d6f592f3364707a58736b69764f4f54736b7838452f4c64367434664a454c4f5251563153563978332f536276626d335636426e51327679504e616a6432624c7a30774b4b646553304a7551534978454b4f54705878796c71567166782b472f42484959544937364e344653316272482f4362577139386f735a4e3244526243544678583351794f55495551516f68423356373376337a6e362f74584e76547244626337585347454545497746324f45454f49676844754f4d66572f42335a73327237454441636d78416e4b4d51546a2b3350734431332f3062393239576c643436356a59536d456b4442554d39786f663454677857374437775638386b55466d47624a542b437a58704f4c5743392b64507371767374766e37764330646563756e756444417a6f493245726e616c454b684c6b65567a39652f7336316e306945434d78424f626e46793844497270492f2b5761716d46554e37746f7941654f5a38665638645777356435416a5a397a6d3350583556374d66562f44456b6f476559313537666e51764e36383858786f6673434f684f57724f4f35672f72723874336c734238575234684577436d774454355577536a776c57654f646b76654e63336a654f3656493335656d53756645543957676c6a49524e465352676f616d694c4a30326161794932577a36743362574e655a5250315930474d51436151444d6c4968683478434470627a796f39566c4e774d326d677155766d3441525564546d364232696f6d655a47353842316f4c725159696f4c617148304932746d79487a70636539512b6c6e6a7a5333315943644c6472787974504644355731564c316456715176566b39636e717939585a36683971696d74674e5a6761545932705a68504b3261722b5a79455450776f4a4e6b6e5248454555393549307934762b594469754a39505a3162785a4c472f613158725437666148342b6e32377637786f6a55597a584a352b545672455a5053626f566566666f4e4744526b6c6458575747753972623737346164666676766a722f2b36394f72546238436745564e34417046453568635146424b6d3075694d616d316e64322f2f38506a30724e34775a634f6d4c647432374e717a373843684938644f6e44707a376361744f2f6365504872793564732f457355794a644d794d3350794d3655566c665562566266726f63656565763731643334336c744249615639494b6b756c566d416f78716b5772414d6f3043685a7138486150504e4d666d353432384c615149363470716e6971324851344268427452526d4254685a4e35734e596b786651587179583958547277745570326b5572525853707667647372766933425076766c493964746b78612b616b466631363674567339554c7266452f32754a594972524e682b70344c7771445044494d54466c433173525249526c4f49553478567076714f645658623669794e394c566172743159486439385232496d304753792f6e6d4e5164765774574c6d364e6753656a6d4551434774583959344e4975425a4c7855704b714b4f6b614867626f6745486b45704a33644b7764463247646f49634b5350436a6b46693468744545555a31554a566564514b504b465a436b7542675a546444546847463361616243486f56773253374766312f4e415156554b6949744572464c2b4341673630796643557264416135374a4c724d59334a35754753785a4d6c597146506549737572516e326d394f736d717262525379434e655851554f354f30796e666b2b6d45784a6d4a684f67536f37623557564a6d486c672b2b74734a553576646a766242395a6146684d554e576a376e4b2b466f434f4b3157343079786b5339456f4c426c54365958354153452f716f70415770475a68735444707a5742315352715a3574324845506c464a35742b70564a6f326c644465773546745a6159634b3235566c3454676d35585155655038357161622f5867707249666e324e6a44567057766c7231314d483437457243314e6e55764d7877546c6c5733546c333132544e33755653346a4d6246696741347573426e45676b57585934343042694f795a47386e54694e4d4f4f3438515132634b656c526459714155414943414c455036454c416772686b4e5071734930366f7773566e3468414178755a736a355459377174726e65315856314d55655439446831544f2f546274754d68496a337772334d656942644b4c436165695950496d6e4f6a55724142584c48736b4273777768494477513267514c54706748342b767248597871712f6f557846495364576d4154457965786c70454c6e414754493059676e7473475046475149794347414d78446d4943784353494b52445469446344596c62566e45417579507336767957422b66644a41334b526f744279537976756147576464645664543733792b2f3431385959495564346d767766756a7a377969632f6d4c2b76336741655433524e37324d736f2b354c3341302f454a5a5253526e6d384375413534486e674265444675425a344f613666614b4352706964724274364e4f6f483353534b5469616d4a61546b546d57574f65525a595a496e6c3545366945526b795973794b33496874737355324f334a333378373738694279794248486e48444b6d547866754f43534b336d39376f5a6237755239344946482b5a774969575163652b6544542f6d567946567855372f676a3338524848514a59414642347a4149597947546c5039375171614354414f5a446a49445a4362494c4a445a49484e41356f4c4d41316b417368426b45636a6963516d526b7046484679417251566142624a686b4d6a486c687059563634794f42375146335a5074514934424f52626b754a507538546d6465352b706f7156615948626a64426371717a4764626b496a6530304e72614b31472b69632b79632f313153596674716c6d506a63344c5a6a562f367a614c374c2b7732754e4871312f64736567346134534f6e414941416b474272516b75545244515077445a41614e36505741624e745a593141687a7072786c4d6f45544a4f466537763557636f52316931722b703733533372616e675a594576323158486973537343614a4467575077307a49624e55755864426a644c372f534d6f435a314d6d4e6a78496d4a6d794168544b574f43716471346c6f6c596f636e7352694e71376556494f58457a45395a64616c2b364c3357314972537a6c344837547946396e4173595a434c626450513235435a76303675706d65375a2f376e71564f38644c6f58753063324e625851334d37526d5634357879506e736e2b2b736f7463387536664f2f417a423663642b6d6d416d3462626a3359354a6e794b5a316a356c52724f6b702b5858642b712f4c7a42613430653761495451344a4546776c362f4b684a57744a7379334c45316d696f495378727630436c516b4c43434d786f394245424d67714441524d526a677949314a634f4c50435a68736f4d356a567a6a4b525471526a6a71525177696d48566542327544626c487430663551512f70374c363335616c784c524e6149654a6f74636d5a5367714a5562446d5a7a444b484c5571734238774c73366330723234746f6c59636c6953366452306b596c68566c31696e47314a717a544431746761536c30754b547461313569744a7574434d4e7838694c4b314247586a305a6e68784d79626f76776d724258744f74474e6e416e6a36707578544b6f73546c6c444f486f3041357456683632757a75784c75665144667577744b42434966534b4b71554449754f7969643530485a4b334f305848687355764267335366626d5a514d4641416762385936786364336139692f547237366a396652644354556c2f6c557630693171396133362b62335168486b416852444b564e70513262787a4e4e774f6b57383552717451754e51565779586b386a4e45754c4969507474784b6c564367454756564676704368716f34366769473053617341525a4e484c7543563876733650434551366d42537732424e473245716c443638697862456945775559334a346f354d65343375514d6f4533696575586a61766862596564776e713361746c34676b6c6e3470785038684a3863736d6a44416a6c5641437446706f364f457745324d67516b584e48675169516d7733476f417a69707963544545544c5a42454b5267357064474973655277796754515a4c6d4e73514b74646e2b7575694733426b6b7551795358794b4b7555475974634f676f57774551576d4c33463030424d59635141416b4642676b44584d366842476e713154674342514344626d2f426d75386e643633314c374639703279513748733668505674476d722f5164785437467454376841625778684f514e47514f5852544975494179464756795644534430454a57746c6b4d2f754f7852444e534a6e427862433649682b532f56775a464161454a654170526d5a717832555655634c553547505359484c4f703769757a416b6d61724a644633437070474e5748384d3550396f522b4467716f506f5a48664c46506b4c7442365643686e314871353554377a38683650504b656a41494332443153594b75357a6b554a72595977554f51674957737266644673465a6b316236773530387561334372476c766c4a725752517851504b6952454a39626e2b6a39432f4576482f4a6c325132354c73514844342f42722b6d52316d525730663653633075466f2b4d674e465559356b6c47534d316a6a4a424d6b6b5351473262676f576b556f77525a5673514b715258454a4b72694f504d724f414a6a4a73354c78527341416d6f6f6c634d53454e58497042493548504d3441516772327555567a6b7962506d31445246536c6831595a305731527045424b496e652f546f48743030594554473851515357454b58476f524f78596e516173576a494b4263565469676c544c75794757695941486b4c43686f524a6e4855316867495a6f6a4d336e5a6d427a4b4b45712f6f4b4767694163706c364353532b5435786141545538624a4d7262495a614d51514f37777a5447715147567a59523271437a646b31306c336b4f6b6d5149434d376439654a5862554f6d365133646531456b504f5841304852383055323664393067534e35766f37703179665347564845415638492f70484c4179683250427574454272666e4e48496b63485947637376364875704b65774b334e457a6871415163676f4a6177303864324c6943624d775167552f7662354257416d5445457259794a484259684368447935356f35754b4b6736693371654b586e2f77346d7a4e7155594e4f74374670344d476962706f54757a67793033332b4c63627273446e56775175354d53712f5a33575835574c726a3251756749706d2b476f545857706d49717a656a4f7769326b4e737072514d2b5055776f69304461625837455269466667415650517a6c7641594f665852356c464932432f573058314b4c4f4946392f2f3431384f717453644b4468662b38386a6c527632447336586d5a727564394f374252506835463575624a4a53686b5871427758505854427a344a5842717851667751485534736964674c2b766f59675378642b734f6e36365133727074707a4f784a48775344436838576f623179723455427072716a49367548466f6c304e4c325034516b7762664c6432356e6e717764754a4a38612b4b55477969714a786e4452627a5571354a68556a5937575851392f396d30456f6a365452457877766c34502b5444372b484c2f5771784c324b47384135616467714a553268657675766f68525978563735385a395671737342306333364265502b6a3863506967376a51434a5465324f6f504d626f46746a2b536a3539766e477a556955347a537261777a4d4e6c516e63557846346e4a39524a79514735593558727136736c6b47314134513872773874345454675569436763364c4561615459313038616b597a394d354e653561482b5142617472774e71316561727a536d634a49587a7a5044536f7068532f53516d76466a67526b596c2f3943334f772b554d48783753466a4b434f4c786c5544353670345274516d70394235744b453464692b7a3468654770785a58705a4d79684a564f74457164654756694a416851566c2b466e74646f49764d484d5a536d376c4d695a56334b7466337a563154436a7244634e626a5656734a39624e4b724670676b5261536643716145306972667935546f55664b4a4947344f70674b547863756f6f4e33516f41314763534453416754535a594973323067684633717a4b5275347939656e4c6a5338685447364c6756523259346565724f35732f6f4b7954373268547634486f59484f316774344f58646d5a636979437955562b365163345076496b48515930763839413230347a6b552f3450747968706e504f6e3474697055497665622b355a2b6237716c4353676e446676367667344b514232736c6a524164795577583578356b31303872456c5671774c4937366a4c5831636b6652346f6a69596e47505a7042776e50454149343443563964305561796957577277716f326943413978726a4c4f4435597154354855314f41416d4a4c6d7a36625250453370466575734737556d5a617269306a5857724233774c7a354157303856376b496c64794672766443474863504d6230683951496b64596754344f43687758766a5a3631315247744a2b504739446c674253774a584b355a335035776d6956774f69336d79676d34706a635747677146334e7a31464241444e6a6a3147612b59322b325473785674747273704f3472453872776d7a4b7663636b59636f7345456e2b6b424432367567694f6832733342644c567a49323948593774635442553534634239357a5279365a69746f72437262366f31614a3832506334377756384575785876396c6b7a37733274766d5874657a676b5a7a644c6f4a4a6d486c5a6b76726c5a75356c3167656d4c454a3056776b7542487649683436772f653875643766526e6a554f4e526234325648423669704733444b75644855532b595666774a53342f746b513663537a5a3138476c364f7976414a66777865364559574264327a755a5662564371375679456564754f7369684b2b58376e634e4a6b6a32515a7065494f5a59514d566f43483232794d59746d72462b74354e4b5a50353933364478677539326334334c6c456f59492b6e42536d67307a434251376c592f2b6e347338496c684435624d44626c62486c65482f35575a366a4c44753142795864544d755a6436545347747031686a4e332b5747307631555752687236696d4e556372793943453555454f6c73614970355553533865503046384e4a6f535933656237687447466d497641307247703865356b303666716d3452395776455a6e3749316b307a552b43685833664936316f7133464e706e616b3735544545502f7668565972324d335a58366b7978616e5a33413157326a792b63766e4d306653394e72364b2b4d6454797978796c766c634f657a347252466a646b50787866424f3733715735674b574d62683834744b6c46572b634a717359456a357666554466354a4142343449336644734d46562b476a4650656169356e6933374f4a594167557465474d363935487975704d41664870586278635757336342746d5768354658424553462f4171725134504f4e734968513576726165623878332f3853394d385976657a41326c2f5054632b754e4c7837664748363133374d6c6e6c34392b2b4d75763259786f49513475797350487466694a5547792b764c51394a466a4466784138797672797a474e5275687472334f34716275494b457435627a58493638645639756242485544376d4a476d477a4e414c3369397734486c756f793065536a7066696b724e3566706b79734c65565642785631544453657747363246437834736674654c5533512f30506e4548476c70635772744979716332346b3677614754584f57313647504446796b39526a496d565a58663878596a415a49324c7938364c76524d5756434b59302f6c4c6170554276594e6b664966796d41365441433150566457413242547a54685555756a316f743568546f34392b2b48306139647a36457730446c757a53676d33584d636f777a3043745a6c7732764c5667453874694c4e6447425a6a6179644a6e757549685073734a676e4354536c5343705649336e384d653075684d726d344e5941433533696a32496b4d2b6c6a33566a4d4f6f2b6948697a44465154512b57563854552f5166796a55316e304650623673484c4d307371734d7a374278674d486276552b715574575a5a4c7856546c386a4c4d7949417650436f6a7148667a6f6665566f6d424a4e4350446c62484e57556d6f662f326e78352b317138487468616d7a527345794d6634766b696c46724b634e2b6c734764514f737a33755836584273786b48437176587a5845316a6c6855466e305772694d7537523638397567476e4a704a527a5165685a56794e39496942524b33364e67516150706e59446652437867384e342b7a326939675436652f7854794f664c4f567330726844376d2f585338595061646546384b61463453614f332f7a413248775466304b4d2f6c526a614e6c563469374b3754386950736f4931626b73347156444e486d7375663465564f554d2f78723073625642723554624a563158304b654c487663696877796e4c6847674e555832464271436862756d434566776f55537544734d47515461544d75506c7334345850686748383243585939656f6e4256324b68614631625a6e4448653837754f6c5041614e4c6c64567972642f4559386458455a2f4135304f533269786861434b76715376657139583371706e2b516e4b6a57616c64646a68675376486957385378336f7332715135423345674c714764742b6568476c6f7866414f594867763570666a31346d757962534b5262756a6968564a52643037467531546e7170514a79384c447a3652733579512f4a635649576c5337304e783751456c2b486547306e385874316437527a56667a3145516b736274556a34444e2f59732b74455034734c6e76693363717367334c6644664f3052376844426d376743396f78574f47337861356e5032714a5675455972566c52427a316f426b792b6d68374453526e5061577a6f43574e7a3035676f52367a56474746655558344f3641364757704174664a5242306a565872322f654d43432b4d6f6f504b6a5055327079506b6346725878787a65562f4d79625069625035304c79756753694d37374869324c43635a51636c487747664a5663763271656659454a6a63556652732f596b74554436486c5147566d5246726478305973614c324373765253657948482f7a4d475042333056556264394c54462b57745a2b716237376f566f38565a58494e575346366a4c76436d507a43696b38394b777a33677961525677304a39393741663239494b505a51705776446a797a43533132684130537833597443326259656b65787149796938584b7a496f50536f4d5973436264413269717262773649614c702f49644267305a43516370326f384b557a5a7a4e4366484832476571705a5558702f744b68585931743956796f4c7447676c746f65726358466e3063793279366265642b5678464663446841486e2b685a426776386835753454726f6f61504d62507a667876577879786844746c5333337476667654572b6874356655386e6352614f69796f5956595134306236377757733971614e4147366f364339712b6c586746376b6a4f74706c41516534476a78564237555765594848346d766f2b6f6b37434637364a37616470417a4130336967702f4167447a4e5232716b71745a62543355662b68785962662f517038544e6e4555446d342f4c7435573137664161784257412f6f4365726f63306d446b475930326c5a4d676777624932507630584d5472733741454634595a44535a4d6868326d634368334b796961485474736751726e5a706a746f6c413933375a385852477872643869765874624152746e7a48686b5778412b68746f3255494433444e705154734159537571626f53385574727057614d74764132563737774b652f676e56424e4972723836616c616f434e36516c744e6e31714c6d3646654d625471534f32344168784d334641662b71756e376e713576572f613050594e614a31627876353451737738447933513952564177776c792f47565638624e6b42396a4670487471536b554d74794b6159494f6b494d6252584c6d33616138394f6c7a50494e714b792f62794673514a59416845433244665334373148776f7a77576966414d65472b506a596d44466b616d51496e4335574177516c517068444f6558455764784d437a4730362b6a4864584849397765576836354441516d594a3278636754796e6e5456705a42687265787067447844597a582b304d63516733353862506d347156304551655457766757716935696367306d557552367747625751536b6e47706a4b4a343235647242486977762f78674d6a4251302f502b73766e4d72344c64702f3079644d414c626c39384a4544794962543068364f42755730707759466e41506d76737341616775443441426141457477337276334168646169364d667a75334739452f7a574f63357a67557463356770587539374e6272506245574a7668444649326a426b63557459312b7254565839316e4f6c34416e77416473676d57325748374a4a396372393875557437414330757970722f314a673477624b7a452f4958633164784e77312b6c37324269414d5278364a39734f4a4d55374d31742b6f506654304b33676666796971625a647645702b374e4f59502f53662b324d5039773771303333336a74315664652f6d756169357839366b6b624f2f6f542f34526676794b2f504f7850395074526341542f712b52616b322f2b4d6456412b7a716c566a663371626743394142565859487361643852784e4630622f76332b4d4e324f4e57337a725454325859353378372f6136397a37586168665a3575763263375a4c6f446e752f49545233325441646433484c4c414434657557336f7a6f6b377875356a7577643331387939684c745244394165354869493678472b68336b654658694d38626a516b324a5069447772383754454d314a5036586c653455575646355265307665716b56634d76577a6744524f76713731763652317a62356c357a384c6272727972385a4857707a592b71325266347673366f6138497649626f54525266344d584d784d6a4378636e4e336966595074546f59797a3341344f65672f534242702f6a50764555565336707176524b356f79596f53576c364753414b63314c6b7756735a61637946723575446564344f366966634b537a2b703349706e475375782b444265394a385538636233424966584878304b56424b79652f466644713061533235426a4172793865746e3746384c77754d385772446f79643353324769792b654f6d7544436761664c584a753154515657786230706632676937724539687231546653634d6530706e4145664246594e6176486c615034796545662b663846644375736e697131664f61766e7448303571477a766f46456c4a63564439747573377669674b6a486d613339554a4f43615a3566326c38764677616a326e54644a734a4946625875567861797565696c6c4a66626c3671706172514776522b6634396e346642614533354867506d70415963764a793976505458323546665563386f6b474a51544f59313546714333706f645a523830784143456a4a3245334f5362626b4f5147344165442f773037594d646e3246374c766f496c526f3354752f666b6974586a516b7975556d724255784a45622b4d432f44536c366252694730683742496c6e63374564614b4b4159475a6d626f2f2f5a6a42486445765a6c344764455a354e715337776a4f4c703073746a4a6a4b394547385361467474474661654b306f4377694d6a6168546265302f706e636d313534394a514c4b54436a4b6a4d4541677265386b506254716b71384a4978484336353044355779765841574f45346f49755452504d6b5a4950514779674e6948476a33766b5a47534561725a58393579376852464a6c683647726b35346e746a786d53676d626334796a634532666e6c65727230513243784f46665358784a416e44434f374b4a6b75595674796534416c563635355364526853696c574969314f3055523557766a3439434c3876574c424159626e73627758326d334158774a5136626f68765666774f4b69584e6644634f56544c774146676b6f4157504b4f55426b666741506f732fa264697066735822122050740f3924aab257a1710625c4a34edf8864c703b792e04c1011e2f839804bd864736f6c634300080a0033";

type Font1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Font1ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Font1__factory extends ContractFactory {
  constructor(...args: Font1ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Font1 & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Font1__factory {
    return super.connect(runner) as Font1__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Font1Interface {
    return new Interface(_abi) as Font1Interface;
  }
  static connect(address: string, runner?: ContractRunner | null): Font1 {
    return new Contract(address, _abi, runner) as unknown as Font1;
  }
}
