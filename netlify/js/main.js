var flowchart,xmlhttp=new XMLHttpRequest;xmlhttp.onreadystatechange=function(){4==this.readyState&&200==this.status?(flowchart_obj=JSON.parse(this.responseText),flowchart=flowchart_obj.flowchart,startFlowchart()):flowchart=null},xmlhttp.open("GET","../flowchart_mapping.json",!0),xmlhttp.send();var winHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;window.addEventListener("scroll",(function(){var e=document.body.scrollTop||document.documentElement.scrollTop,t=document.getElementById("flowchart-back-container");t.style.display=e+50>=winHeight?"none":"block"}));var questionsChosen_arr=[],flowchartQuestionEle=document.getElementById("flowchart-question"),flowchartChoicesContainerEle=document.getElementById("flowchart-choices-container"),flowchartBackEle=document.getElementById("flowchart-back-container");function startFlowchart(){createNodes(flowchart[0],"q")}function createNodes(e,t){if(flowchartChoicesContainerEle.hasChildNodes())for(;flowchartChoicesContainerEle.firstChild;)flowchartChoicesContainerEle.removeChild(flowchartChoicesContainerEle.lastChild);if(flowchartQuestionEle.innerHTML="q"===t?e.ques:"here are the results","q"===t)for(var a=0;a<e.tails.length;a++){(n=document.createElement("span")).setAttribute("class","flowchart-choice"),n.setAttribute("data-choice-index",e.tails[a].tail);var r=document.createTextNode(e.tails[a].ans);n.appendChild(r),n.addEventListener("click",(function(t){var a=t.target.dataset.choiceIndex;questionsChosen_arr.push(e.head);var r=getNextNode(a);createNodes(r,r.type)})),flowchartChoicesContainerEle.appendChild(n),o(n)}else for(a=0;a<e.tails.length;a++){var n;(n=document.createElement("span")).setAttribute("class","flowchart-choice"),n.setAttribute("data-answer-title",e.tails[a]);r=document.createTextNode(e.tails[a]);n.appendChild(r),n.addEventListener("click",(function(t){var a=t.target.dataset.answerTitle;questionsChosen_arr.push(e.head),createResult(a)})),flowchartChoicesContainerEle.appendChild(n),o(n)}function o(e){var t=0,a=setInterval(()=>{1==e.style.opacity?clearInterval(a):(t+=.02,e.style.opacity=t)},10)}}function createResult(e){if(flowchartChoicesContainerEle.hasChildNodes())for(;flowchartChoicesContainerEle.firstChild;)flowchartChoicesContainerEle.removeChild(flowchartChoicesContainerEle.lastChild);jikanGetAnime(e),flowchartQuestionEle.innerHTML=e}function getNextNode(e){for(var t=0;t<flowchart.length;t++)if(flowchart[t].head==e)return flowchart[t];return-1}function jikanGetAnime(e){var t=document.createElement("div");t.setAttribute("class","spinner"),flowchartChoicesContainerEle.append(t),fetch(`https://api.jikan.moe/v3/search/anime?q=${e}&limit=3`).then((function(e){return e.json()})).then((function(t){if(flowchartChoicesContainerEle.hasChildNodes())for(;flowchartChoicesContainerEle.firstChild;)flowchartChoicesContainerEle.removeChild(flowchartChoicesContainerEle.lastChild);for(var a=0;a<t.results.length;a++){var r=document.createElement("div");r.setAttribute("class","anime");var n=document.createElement("a");n.setAttribute("href",t.results[a].url),n.setAttribute("target","_blank"),n.setAttribute("rel","noopener noreferrer"),n.setAttribute("class","anime-link");var o=document.createElement("img");o.setAttribute("src",t.results[a].image_url),o.setAttribute("alt","image of "+e),o.setAttribute("class","anime-image"),n.appendChild(o);var i=document.createElement("a");i.setAttribute("href",t.results[a].url),i.setAttribute("target","_blank"),i.setAttribute("rel","noopener noreferrer"),i.setAttribute("class","anime-link");var l=document.createElement("p");l.setAttribute("class","anime-title");var c=document.createTextNode(t.results[a].title);l.appendChild(c),i.appendChild(l),r.appendChild(n),r.appendChild(i),flowchartChoicesContainerEle.append(r)}}))}flowchartBackEle.addEventListener("click",(function(){var e=questionsChosen_arr.pop();if(void 0!==e){var t=getNextNode(e);createNodes(t,t.type)}}));