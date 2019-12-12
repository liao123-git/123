class Main {
    constructor() {
        this.dom = $(".container");
        this.init();
        console.log(data);
    }

    init() {
        this.createDom();
    }

    createDom() {
        let index = 0;
        data.forEach((v, k) => {
            index++;
            let dom = $(`<div class="jumbotron m-5 py-4" style="box-shadow: 0 0 20px rgba(0,0,0,.5);"><h3 class="font-weight-normal">${index}.${v['question_text']}<span style="font-size: .6em">(${v['question_type']})</span></h3></div>`);
            /*options*/
            let optionDiv = $(`<div class="row mt-4"></div>`);
            dom.append(optionDiv);
            let options = v['options'].split(',');
            let optionsArr = ['A', "B", "C", "D", "E", "F"];
            let answer = {};
            for (let i = 0; i < v['answer'].split('').length; i++) {
                answer[v['answer'][i]] = true;
            }
            for (let i = 0; i < options.length; i++) {
                let is_answer = answer[optionsArr[i]] ? "text-danger font-weight-bold" : "";
                let value = options[i];
                optionDiv.append(`<p class="lead col-6 ${is_answer}">${optionsArr[i]}.<script type="text/html" style="display:inline-block">${value}</script></p>`);
            }
            /*analysis*/
            dom.append(`<div class="accordion" id="accordionExample${index}">
                <div class="card">
                    <div class="card-header px-0 bg-light" id="headingOne${index}">
                        <h2 class="mb-0">
                            <button class="btn btn-link text-dark" type="button" data-toggle="collapse" data-target="#collapseOne${index}" aria-expanded="true" aria-controls="collapseOne${index}">
                                题目解析
                            </button>
                        </h2>
                    </div>
    
                    <div id="collapseOne${index}" class="collapse" aria-labelledby="headingOne${index}" data-parent="#accordionExample${index}">
                        <div class="card-body">
                        ${v['analysis'] ? v['analysis'] : "No analysis"}
                        </div>
                    </div>
                </div>
            </div>`);
            this.dom.append(dom);
        });
    }
}

$(() => {
    new Main();
});