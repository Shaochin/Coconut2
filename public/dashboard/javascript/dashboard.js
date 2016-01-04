$(document).ready(function() {
    noteDataBaseRegister=  (function() {
        var getExampleRef= function () {

            var ref = new Firebase('https://coconutdata.firebaseio.com/');
            // var hash = window.location.hash.replace(/#/g, '');
            // if (hash) {
            //     ref = ref.child(hash);
            // } else {
            //     ref = ref.push(); // generate unique location.
            //     window.location = window.location + '#' + ref.key(); // add it as a hash to the URL.
            // }
            // if (typeof console !== 'undefined')
            //     console.log('Firebase data: ', ref.toString());
            return ref;
        }
        var helloworld = function(){
            return "helloworld";
        }
        return{
            getExampleRef:getExampleRef,
            helloworld:helloworld
        };
    }());


    cocoPadRef = noteDataBaseRegister.getExampleRef();


    $('.RenderNote').click(function(event) {

        renderCheck.renderPad(this.id,'firepad-container',false);

    });
    testCourse2 = new EJS({url: 'views/dialog'}).render("123");

    $('#addNewCourseBtn').click(function(event) {
        CourseData = {
            name : "",
            ownerFBuid : userData.oauthID,
            ownerName: userData.name,
            member: [],
            created : ""
        }; 
        // var testCourse = new EJS({url: 'views/dialogs/addCourse'}).render(CourseData);
        console.log(CourseData);
        // var updateme= new EJS({url: 'views/dialogs/addCourse'}).update('deleteme','fuck');
        // var courseContainer = new EJS({url: 'views/dialogs/addCourse'}).render(CourseData);
        // console.log("courseContainer : "+courseContainer);
        // $('#dataDialog').empty();
        // $('#dataDialog').append(courseContainer);

        var ownerName = document.getElementById('AddCouserInputOwnerName');
        var ownerFBuid = document.getElementById('AddCouserInputOwnerFBuid');

        ownerName.value = CourseData.ownerName;
        ownerFBuid.value = CourseData.ownerFBuid;
        $('#addCourseModal').modal('toggle');
    }); 

    $('#addJoinCourseBtn').click(function(event) {
        var userID = userData.oauthID;

        var ownerFBuid = document.getElementById('JoinCouserInputOwnerFBuid');
        ownerFBuid.value = userID;
        $('#addJoinCourseModal').modal('toggle');

    });

    $('.CourseAddNote').click(function(event) {
        console.log("hello world:"+this.id);


        var courseID = document.getElementById('AddNoteInputCourseID');
        var courseName = document.getElementById("AddNoteInputCourseName");


        courseID.value = this.id;

        $('#addNoteModal').modal('toggle');
    });

    $('.Profile').click(function(event) {

        $('#myModal').modal('toggle');
        
    });
    var init = (function(){
        var regDiaLoader = (function() {
            if(isRegCompletely===true){

            }else{
                console.log("showReg");
                $('#myModal').modal('toggle');
                // $('#example').tooltip(options)
            }
        }());

        var deHashFbBug = (function() {
                if (window.location.hash && window.location.hash == '#_=_') {
                    if (window.history && history.pushState) {
                        window.history.pushState("", document.title, window.location.pathname);
                    } else {
                        // Prevent scrolling by storing the page's current scroll offset
                        var scroll = {
                            top: document.body.scrollTop,
                            left: document.body.scrollLeft
                        };
                        window.location.hash = '';
                        // Restore the scroll offset, should be flicker free
                        document.body.scrollTop = scroll.top;
                        document.body.scrollLeft = scroll.left;
                    }
                }
        }());

        var noteHashProcess = (function() {
            var para = renderCheck.getHash();

            console.log("Hash is : "+renderCheck.getHash());
            console.log("Current Course is : "+JSON.stringify(CourseData,null,2));

            if(para===undefined){
                console.log("hash is undefined");

                renderCheck.renderPad('郭彥君','firepad-container','nocursor');

            }else{
                var flag = 0 ;

                //check own data
                for (var i = 0; i < CourseData.datas.ownCourses.length; i++) {
                    for (var j = 0; j < CourseData.datas.ownCourses[i].NoteData.length; j++) {
                        if(CourseData.datas.ownCourses[i].NoteData[j].noteID === para){
                            flag = 1 ;
                            break;
                        }
                    }
                    if(flag == 1 ){
                        break;
                    }
                }

                //check join data
                for (var i = 0; i < CourseData.datas.joinCourses.length; i++) {
                    for (var j = 0; j < CourseData.datas.joinCourses[i].NoteData.length; j++) {
                        if(CourseData.datas.joinCourses[i].NoteData[j].noteID === para){
                            flag = 1 ;
                            break;
                        }
                    }
                    if(flag == 1 ){
                        break;
                    }
                }

                if(flag === 1) {
                    console.log("find data");
                    // render 
                    renderCheck.renderPad(para,'firepad-container');


                }else{
                    console.log("not find data!!");
                    //
                    // alert("you dont have the right");
                    $.ajax({
                        url: '/isExistCourse',
                        type: 'POST',
                        dataType: 'json',
                        data: {noteid: para,
                            userid: userData.oauthID
                            }
                    })
                    .done(function(data) {
                        console.log("success");
                        console.log(data);
                        // window.location.reload();
                        var userID = userData.oauthID;
                        var courseID = data.data.courseId;
                        var ownerFBuid = document.getElementById('JoinCouserInputOwnerFBuid');
                        ownerFBuid.value = userID;
                        var joinCourseID = document.getElementById('joincourseId');
                        joinCourseID.value = courseID;
                        $('#addJoinCourseModal').modal('toggle');

                    })
                    .fail(function() {
                        console.log("error");
                    })
                    .always(function() {
                    });
                    
                }
            }

        })();

        var formValidationRegister = (function() {

            var uniData = ['國立政治大學','國立清華大學','國立臺灣大學','國立臺灣師範大學','國立成功大學','國立中興大學','國立交通大學','國立中央大學','國立中山大學','國立臺灣海洋大學','國立中正大學','國立高雄師範大學','國立彰化師範大學','國立陽明大學','國立臺北大學','國立嘉義大學','國立高雄大學','國立東華大學','國立暨南國際大學','國立臺灣科技大學','國立雲林科技大學','國立屏東科技大學','國立臺北科技大學','國立高雄第一科技大學','國立高雄應用科技大學','國立臺北藝術大學','國立臺灣藝術大學','國立臺東大學','國立宜蘭大學','國立聯合大學','國立虎尾科技大學','國立高雄海洋科技大學','國立臺南藝術大學','國立臺南大學','國立臺北教育大學','國立新竹教育大學','國立臺中教育大學','國立澎湖科技大學','國立勤益科技大學','國立體育大學','國立臺北護理健康大學','國立高雄餐旅大學','國立金門大學','國立臺灣體育運動大學','國立臺中科技大學','國立屏東大學','國立臺北商業大學','國立臺灣戲曲學院','東海大學','輔仁大學','東吳大學','中原大學','淡江大學','中國文化大學','逢甲大學','靜宜大學','長庚大學','元智大學','中華大學','大葉大學','華梵大學','義守大學','世新大學','銘傳大學','實踐大學','朝陽科技大學','高雄醫學大學','南華大學','真理大學','大同大學','南臺科技大學','崑山科技大學','嘉藥學校財團法人嘉南藥理大學','樹德科技大學','慈濟學校財團法人慈濟大學','臺北醫學大學','中山醫學大學','龍華科技大學','輔英科技大學','明新科技大學','長榮大學','弘光科技大學','中國醫藥大學','健行學校財團法人健行科技大學','正修科技大學','萬能學校財團法人萬能科技大學','玄奘大學','建國科技大學','明志科技大學','高苑科技大學','大仁科技大學','聖約翰科技大學','嶺東科技大學','中國科技大學','中臺科技大學','亞洲大學','開南大學','佛光大學','台南家專學校財團法人台南應用科技大學','遠東科技大學','光宇學校財團法人元培醫事科技大學','景文科技大學','中華醫事科技大學','東南科技大學','德明財經科技大學','明道學校財團法人明道大學','康寧大學','南開科技大學','中華學校財團法人中華科技大學','僑光科技大學','廣亞學校財團法人育達科技大學','美和學校財團法人美和科技大學','吳鳳科技大學','環球學校財團法人環球科技大學','台灣首府學校財團法人台灣首府大學','中州學校財團法人中州科技大學','修平學校財團法人修平科技大學','長庚學校財團法人長庚科技大學','興國管理學院','大華學校財團法人大華科技大學','文藻學校財團法人文藻外語大學','大漢技術學院','慈濟學校財團法人慈濟技術學院','和春技術學院','城市學校財團法人臺北城市科技大學','致理技術學院','醒吾學校財團法人醒吾科技大學','亞東技術學院','桃園創新科技學校財團法人桃園創新技術學院','稻江科技暨管理學院','德霖技術學院','南榮學校財團法人南榮科技大學','蘭陽技術學院','黎明技術學院','東方學校財團法人東方設計學院','經國管理暨健康學院','崇右技術學院','大同技術學院','亞太學校財團法人亞太創意技術學院','華夏學校財團法人華夏科技大學','臺灣觀光學院','台北海洋技術學院','馬偕醫學院','法鼓學校財團法人法鼓文理學院','學校財團法人中華浸信會基督教台灣浸會神學院','臺北基督學院','臺北市立大學','國立空中大學','高雄市立空中大學','中華民國陸軍軍官學校','海軍軍官學校','中華民國空軍軍官學校','國防大學','中央警察大學','國防醫學院','國立空軍航空技術學院']

            var departmentData = ['機械工程學系','應用力學研究所','土木工程學系','化學工程學系','高分子科學與工程學研究所','材料科學與工程學系','工業工程學研究所','環境工程學研究所','工程科學及海洋工程學系','醫學工程學研究所','建築與城鄉研究所','公共衛生學系','公共衛生碩士學位學程','職業醫學與工業衛生研究所','環境衛生研究所','流行病學與預防醫學研究所','健康政策與管理研究所','華語教學碩士學位學程','音樂學研究所','戲劇學系','藝術史研究所','臺灣文學研究所','中國文學系','外國語文學系','日本語文學系','翻譯碩士學位學程','語言學研究所','歷史學系','人類學系','哲學系','圖書資訊學系','牙醫學系','臨床牙醫學研究所','口腔生物科學研究所','生命科學系','植物科學研究所','生態學與演化生物學研究所','生化科學研究所','生化科技學系','分子與細胞生物學研究所','基因體與系統生物學學位學程','漁業科學研究所','昆蟲學系','生物科技研究所','生物產業機電工程學系','生物環境系統工程學系','農藝學系','動物科學技術學系','園藝暨景觀學系','植物病理與微生物學系','植物醫學碩士學位學程','農業經濟學系','生物產業傳播暨發展學系','食品科技研究所','農業化學系','森林環境暨資源學系','統計碩士學位學程','法律學系','科際整合法律學研究所','經濟學系','政治學系','社會學系','公共事務研究所','國家發展研究所','新聞研究所','社會工作學系','心理學系','地理環境資源學系','化學系','地質科學系','物理學系','應用物理學研究所','大氣科學系','海洋研究所','天文物理研究所','數學系','應用數學科學研究所','資訊網路與多媒體研究所','電機工程學系','電子工程學研究所','光電工程學研究所','資訊工程學系','電信工程學研究所','生醫電子與資訊學研究所','商學研究所','會計學系','工商管理學系','國際企業學系','財務金融學系','管理學院企業管理碩士專班','管理學院碩士在職專班','資訊管理學系','微生物學研究所','生物化學暨分子生物學研究所','醫學系','臨床醫學研究所','分子醫學研究所','免疫學研究所','生理學研究所','病理學研究所','解剖學暨細胞生物學研究所','腫瘤醫學研究所','轉譯醫學博士學位學程','基因體暨蛋白體醫學研究所','醫學教育暨生醫倫理研究所','藥理學研究所','物理治療學系','職能治療學系','護理學系','醫學檢驗暨生物技術學系','法醫學研究所','毒理學研究所','腦與心智科學研究所','獸醫學系','臨床動物醫學研究所','分子暨比較病理生物學研究所','藥學系','臨床藥學研究所']
            var substringMatcher = function(strs) {
                return function findMatches(q, cb) {
                    var matches, substrRegex;
                    // an array that will be populated with substring matches
                    matches = [];
                    // regex used to determine if a string contains the substring `q`
                    substrRegex = new RegExp(q, 'i');
                    // iterate through the pool of strings and for any string that
                    // contains the substring `q`, add it to the `matches` array
                    $.each(strs, function(i, str) {
                        if (substrRegex.test(str)) {
                            // the typeahead jQuery plugin expects suggestions to a
                            // JavaScript object, refer to typeahead docs for more info
                            matches.push({ value: str });
                        }
                    });
                    cb(matches);
                };
            };

            $('#schoolInfoForm').find('input[name="university"]').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            }, {
                name: 'states',
                displayKey: 'value',
                source: substringMatcher(uniData)
            })
            .on('typeahead:selected', function(e, suggestion, dataSetName) {
                // Revalidate the state field
                $('#schoolInfoForm').formValidation('revalidateField', 'state');
            })
            .on('typeahead:closed', function(e) {
                // Revalidate the state field
                $('#schoolInfoForm').formValidation('revalidateField', 'state');
            });

            $('#schoolInfoForm').find('input[name="uni_department"]').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            }, {
                name: 'states',
                displayKey: 'value',
                source: substringMatcher(departmentData)
            })
            .on('typeahead:selected', function(e, suggestion, dataSetName) {
                // Revalidate the state field
                $('#schoolInfoForm').formValidation('revalidateField', 'state');
            })
            .on('typeahead:closed', function(e) {
                // Revalidate the state field
                $('#schoolInfoForm').formValidation('revalidateField', 'state');
            });



            $('#schoolInfoForm').formValidation({
                framework: 'bootstrap',
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    university: {
                        validators: {
                            notEmpty: {
                                message: "Can't be Empty!!"
                            }
                        }
                    },
                    uni_department : {
                        validators: {
                            notEmpty: {
                                message: "Can't be Empty!!"
                            }
                        }
                    }

                }
            });

            $('#addNewCourseForm').formValidation({
                framework: 'bootstrap',
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    courseName: {
                        validators: {
                            notEmpty: {
                                message: "Can't be Empty!!"
                            }
                        }
                    },
                    acadeYear : {
                        validators: {
                            notEmpty: {
                                message: "Can't be Empty!!"
                            }
                        }
                    },
                    forClass : {
                        validators: {
                            notEmpty: {
                                message: "Can't be Empty!!"
                            }
                        }
                    }

                }
            });

            $('#addNoteForm').formValidation({
                framework: 'bootstrap',
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    CourseID: {
                        validators: {
                            notEmpty: {
                                message: "Can't be Empty!!"
                            }
                        }
                    },
                    noteName : {
                        validators: {
                            notEmpty: {
                                message: "Can't be Empty!!"
                            }
                        }
                    }

                }
            });


            $('#addJoinCourseForm').formValidation({
                framework: 'bootstrap',
                icon: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    joincourseId: {
                        validators: {
                            notEmpty: {
                                message: "Must be Number!!"
                            },
                            stringLength: {
                                min: 8,
                                max: 8,
                                message: 'The Course ID must be 8 in length'
                            }
                        }
                    }
                }
            });


        })();


        //cocoPad init
        cocoPadRef = noteDataBaseRegister.getExampleRef();



    }());
});

renderCheck = (function() {
    var getHash = function () {
        return window.location.hash.split('#')[1];
    }
    var renderPad = function (id,contain,isInit) {

        if(userData.name==="郭彥君"){
            isInit = false;
        }

        var noteID = id;
        var container = contain;

        cocoPadRef.path.o[0]= noteID ;
        //// Create CodeMirror (with lineWrapping on).

        // var container =document.getElementById('firepad-container'); 
        var container =document.getElementById(container); 

        container.innerHTML="";

        var codeMirror = CodeMirror(container, { lineWrapping: true ,readOnly:isInit});

        var cocopad = Firepad.fromCodeMirror(cocoPadRef, codeMirror,
        { richTextToolbar: true, richTextShortcuts: true });

        cocopad.on('ready', function() {
            if (cocopad.isHistoryEmpty()) {
                cocopad.setHtml(
                    '<span style="font-size: 24px;">Course is  editing with <span style="color: red">cocopad!</span></span><br/>\n' +
                    '<br/>' +
                  '<div style="font-size: 18px">' +
                  'Supports:<br/>' +
                  '<ul>' +
                    '<li>Different ' +
                      '<span style="font-family: impact">fonts,</span>' +
                      '<span style="font-size: 24px;"> sizes, </span>' +
                      '<span style="color: blue">and colors.</span>' +
                    '</li>' +
                    '<li>' +
                      '<b>Bold, </b>' +
                      '<i>italic, </i>' +
                      '<u>and underline.</u>' +
                    '</li>' +
                    '<li>Lists' +
                      '<ol>' +
                        '<li>One</li>' +
                        '<li>Two</li>' +
                      '</ol>' +
                    '</li>' +
                    '<li>Undo / redo</li>' +
                    '<li>Cursor / selection synchronization.</li>' +
                    '<li><checkbox></checkbox> It supports customized entities.</li>' +
                    '<li>And it\'s all fully collaborative!</li>' +
                  '</ul>' +
                  '</div>');
            }
        });

        cocopad.registerEntity('checkbox', {
            render: function(info, entityHandler) {
                var inputElement = document.createElement('input');
                inputElement.setAttribute('type', 'checkbox');
                if (info.checked) {
                    inputElement.checked = 'checked';
                }
                inputElement.addEventListener('click', function() {
                    entityHandler.replace({
                        checked: this.checked
                    });
                });
                return inputElement;
            }.bind(this),
            fromElement: function(element) {
                var info = {};
                if (element.hasAttribute('checked')) {
                    info.checked = true;
                }
                return info;
            },
            update: function(info, element) {
                if (info.checked) {
                    element.checked = 'checked';
                } else {
                    element.checked = null;
                }
            },
            export: function(info) {
                var inputElement = document.createElement('checkbox');
                if (info.checked) {
                    inputElement.setAttribute('checked', true);
                }
                return inputElement;
            }
        });
            
    }
    return{
        getHash : getHash,
        renderPad : renderPad
    }
})();