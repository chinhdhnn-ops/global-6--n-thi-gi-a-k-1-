'use strict';
const $=id=>document.getElementById(id);
const KEY='english6-fast-exam-v1';
let state={name:'',className:'',last:1,results:{},speed:.8,voice:''};
try{state={...state,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch{}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state))}catch{}};
let current=1,mode='guided',sequence=[],position=0,selected='',checked=false,started=false,needsHint=false,voices=[];
const ESC=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const VI_TRANSLATIONS={
1:'Hầu hết các trường yêu cầu học sinh mặc đồng phục.',
2:'Chúng tôi chơi bóng đá vào giờ ra chơi.',
3:'Trẻ em sẽ học chăm chỉ nếu các bài học thú vị.',
4:'Hãy mặc đồng phục vào và đi học nào.',
5:'Bạn tôi tập võ judo để tự bảo vệ mình.',
6:'Ở nhiều trường tại Việt Nam, học sinh phải mặc đồng phục.',
7:'Trường nội trú là trường mà học sinh vừa học vừa sống trong năm học.',
8:'AIS là một trường quốc tế ở Việt Nam. Trường cung cấp chương trình giáo dục Mỹ.',
9:'Mỗi ngày tôi đi xe đạp đến trường.',
10:'Chị tôi rất sáng tạo. Chị ấy rất giỏi vẽ tranh.',
11:'Chúng tôi thường ăn bữa trưa ở căng-tin trường.',
12:'Môn học yêu thích của bạn là gì? – Mình thích tiếng Anh.',
13:'Bạn của Duy đang đợi cậu ấy mặc đồng phục để cùng đi học.',
14:'Phép tính này khó quá. Mình có thể mượn máy tính của bạn không?',
15:'Trong giờ Khoa học, họ học về động vật và thực vật.',
16:'Năm học này chúng tôi có một số môn học mới: Vật lí, Khoa học máy tính, v.v.',
17:'Wellspring Saigon là một trường quốc tế.',
18:'Trẻ em thích chơi bóng đá.',
19:'Ở nhiều trường tại Việt Nam, học sinh phải mặc đồng phục.',
20:'Bọn trẻ trông rất hào hứng khi chơi trò chơi trong giờ ra chơi.',
21:'Có 30 học sinh trong lớp tôi.',
22:'Vy và Phong rất hào hứng về ngày đầu tiên ở trường trung học cơ sở.',
23:'Bạn có thể dùng compa để vẽ hình tròn.',
24:'Hôm nay chúng tôi có hai tiết Mĩ thuật.',
25:'Tôi hiếm khi tập thể dục vào buổi sáng, nhưng chị tôi thường làm vậy.',
26:'Thắng giỏi chơi bóng đá. Cậu ấy là cầu thủ giỏi nhất lớp tôi.',
27:'Em trai bạn có học tiếng Anh và Ngữ văn vào thứ Hai không?',
28:'Chúng tôi học về máy tính trong môn Tin học.',
29:'Đó là phòng thí nghiệm, nơi chúng tôi làm tất cả các thí nghiệm.',
30:'Tôi thường làm bài tập về nhà sau bữa tối.',
31:'Chúng tôi thường không đi học bằng xe buýt.',
32:'John đi câu cá khi có thời gian rảnh.',
33:'Chị gái hoặc em gái của bạn học môn gì ở trường?',
34:'Tôi luôn dậy sớm để đi học.',
35:'Wendy luôn học chăm chỉ để đạt điểm cao.',
36:'Bạn học tiếng Anh khi nào? – Mình học vào thứ Hai và thứ Sáu.',
37:'Bạn học tiếng Anh bao lâu một lần? – Hai lần một tuần.',
38:'Giáo viên tiếng Anh của cậu ấy nói rằng cậu ấy là một học sinh tốt.',
39:'Trong giờ Mĩ thuật, cậu ấy dùng bút màu, bút chì và thước để vẽ.',
40:'Vernon không thích làm việc với các bạn trong giờ Khoa học.',
41:'Wendy thấy khó để đạt điểm tốt môn Toán.',
42:'Tôi thích học Toán vì nó giúp tôi phát triển tư duy.',
43:'Tôi dành nhiều thời gian làm bài tập Toán.',
44:'Tôi thường đạt điểm 9 và 10 trong các bài kiểm tra Toán.',
45:'Các cấu trúc tiếng Anh rất khó đối với tôi.',
46:'Cô ấy cho tôi một số sách tiếng Anh và chỉ tôi cách nhớ từ tốt hơn.',
47:'Có một chiếc giường đẹp và một giá sách trong phòng ngủ của tôi.',
48:'Tôi thích phòng khách nhất.',
49:'Có bốn chiếc ghế và một cái bàn trong phòng ăn của tôi.',
50:'Nhà tôi ở phía trước cái cây cao.',
51:'Hiệu sách ở phía trước nhà của Hoa.',
52:'Có một chiếc giường đẹp và một giá sách trong phòng ngủ của tôi.',
53:'Có một cái tủ, một máy rửa bát và một cái bàn trong nhà bếp.',
54:'Có bốn chiếc ghế và một cái bàn trong phòng ăn của tôi.',
55:'Có bao nhiêu cái bàn trong lớp học?',
56:'Đây là ghế của tôi và kia là những chiếc ghế của bạn.',
57:'Có một cái tủ, một máy rửa bát và một cái bàn trong nhà bếp.',
58:'Chúng tôi sống trong cùng một tòa nhà, vì vậy chúng tôi luôn đi bộ về nhà cùng nhau.',
59:'Lan sống cạnh nhà tôi.',
60:'Có bao nhiêu cái bàn trong lớp học?',
61:'Nhà tôi ở phía trước cái cây cao.',
62:'Có một chiếc giường đẹp và một giá sách trong phòng ngủ của tôi.',
63:'Có bốn chiếc ghế và một cái bàn trong phòng ăn của tôi.',
64:'Tên tôi là Nga và bạn thân nhất của tôi là Lan. Cậu ấy là bạn cùng lớp của tôi.',
65:'Cô ấy là một cô gái thông minh. Môn yêu thích của cô ấy là Toán và cô ấy thực sự giỏi môn đó.',
66:'Họ thường giúp đỡ nhau làm bài tập về nhà.',
67:'Lan kể chuyện để làm Nga vui.',
68:'Tôi cảm thấy thật may mắn khi có một người bạn thân như Lan.',
69:'Janet trông như thế nào?',
70:'Cô ấy cao và gầy.',
71:'Tôi hơi ít nói và nhút nhát.',
72:'Janet tốt bụng và thân thiện.',
73:'Julie khá ít nói và nhút nhát.',
74:'Chúng tôi thích dành thời gian rảnh ở bên nhau.',
75:'Vào giờ ra chơi, đôi khi họ chơi nhảy dây hoặc ngồi trò chuyện.',
76:'Vào giờ ra chơi, đôi khi chúng tôi chơi nhảy dây hoặc chỉ ngồi trò chuyện.',
77:'Vì họ sống trong cùng một tòa nhà nên họ đi bộ về nhà cùng nhau.',
78:'Julie nhờ Janet giúp khi gặp câu hỏi khó trong bài tập về nhà.',
79:'Janet thường muốn đi trượt băng ở công viên hoặc đi xem phim.',
80:'Tôi thích ở nhà và đọc truyện tranh.',
81:'Tuy nhiên, chúng tôi thường cùng nhau lên kế hoạch cho ngày của mình.',
82:'Janet trông như thế nào? – Cô ấy cao và gầy.',
83:'Julie là người như thế nào? – Cô ấy khá ít nói và nhút nhát.',
84:'Cả hai chúng tôi đều cao và mảnh mai.',
85:'Hai bạn có ngoại hình giống nhau nhưng tính cách khác nhau.',
86:'Oak City là một thành phố tuyệt vời. Oak City rất hiện đại và đẹp.',
87:'Có các rạp chiếu phim, công viên và vũ trường.',
88:'Nơi đó cũng có một số cửa hàng quần áo và âm nhạc tuyệt vời.',
89:'Thành phố Oak rất hiện đại và đẹp.',
90:'Không có tòa nhà xấu nào và xung quanh thành phố có phong cảnh đẹp.',
91:'Không có tòa nhà xấu nào và xung quanh thành phố này có phong cảnh đẹp.',
92:'Không có nhiều ô nhiễm vì không có nhiều giao thông.',
93:'Mọi người đi lại bằng xe đạp và đi bộ.',
94:'Vì vậy không có nhiều tai nạn.',
95:'Hãy đến và ở đây một thời gian nhé.',
96:'Thành phố Đà Nẵng ở miền Trung Việt Nam.',
97:'Vào kì nghỉ hè, tôi thường đến Đà Nẵng thăm ông bà.',
98:'Tôi thăm ông bà và đi tham quan nhiều địa danh nổi tiếng ở đây.',
99:'Những địa danh nổi tiếng ở đây như Ngũ Hành Sơn, bãi biển Mỹ Khê và Bà Nà Hills.',
100:'Bà Nà Hills có phải là một trong những địa danh nổi tiếng ở Đà Nẵng không? – Có, đúng vậy.'
};
function stripCode(text){return String(text||'').replace(/^Ex\.[^:]*:\s*/,'').trim();}
function buildFullSentence(l){if(l.answer&&l.question.includes('_____'))return stripCode(l.question).replace('_____',l.options[l.answer]);if(l.answer&&l.options&&l.options[l.answer])return l.options[l.answer];if(l.accepted&&l.accepted[0])return l.accepted[0];return stripCode(l.question);}
function sentenceTranslation(l){return VI_TRANSLATIONS[l.id]||l.vocabulary.map(x=>x.vi).join(' · ')||'Chưa có câu dịch.';}
const lesson=id=>LESSONS.find(x=>x.id===id);
const summary=()=>Object.values(state.results);
const openModal=id=>$(id).classList.remove('hidden');
const closeModal=id=>$(id).classList.add('hidden');
function loadVoices(){if(!('speechSynthesis' in window)){ $('voiceInfo').textContent='Trình duyệt không hỗ trợ đọc tiếng Anh.';return; }
 voices=speechSynthesis.getVoices().filter(v=>v.lang.toLowerCase().startsWith('en'));voices.sort((a,b)=>Number(b.lang.toLowerCase().startsWith('en-gb'))-Number(a.lang.toLowerCase().startsWith('en-gb')));
 $('voice').innerHTML='<option value="">Tự chọn giọng tiếng Anh</option>'+voices.map(v=>`<option value="${ESC(v.voiceURI)}">${ESC(v.name)} (${ESC(v.lang)})</option>`).join('');$('voice').value=voices.some(v=>v.voiceURI===state.voice)?state.voice:'';
 $('voiceInfo').textContent=voices.length?`Có ${voices.length} giọng tiếng Anh trên thiết bị. Tốc độ thực tế tùy giọng.`:'Chưa tìm thấy giọng tiếng Anh. Hãy cài giọng tiếng Anh trong hệ điều hành nếu cần.';
}
let activeUtterance=null, audioSerial=0, audioTimer=null;
const AUDIO=$('fallbackAudio');
function statusAudio(message){const e=$('audioStatus');if(e)e.textContent=message;const m=$('voiceInfo');if(m&&message.includes('không'))m.textContent=message;}
function audioPath(kind,id){return `audio/${String(id).padStart(3,'0')}_${kind}.mp3`}
function mp3(kind,id){stop();let path=audioPath(kind,id);AUDIO.src=path;AUDIO.playbackRate=Math.max(.7,Math.min(1.3,(Number(state.speed)||.8)/.8));AUDIO.load();statusAudio('♫ Đang phát âm thanh MP3…');AUDIO.play().catch(err=>statusAudio('Không phát được MP3: '+err.message));}
AUDIO.addEventListener('ended',()=>statusAudio('✓ Đã nghe xong · Bấm loa để nghe lại'));
AUDIO.addEventListener('error',()=>{if(AUDIO.getAttribute('src'))statusAudio('Không tìm thấy tệp MP3. Hãy giải nén đầy đủ thư mục audio.');});
function stop(){audioSerial++;if(audioTimer)clearTimeout(audioTimer);audioTimer=null;try{speechSynthesis.cancel()}catch{}try{AUDIO.pause();AUDIO.currentTime=0;AUDIO.removeAttribute('src')}catch{}activeUtterance=null;}
function speak(raw,kind=null){let txt=String(raw||'').replace(/^Ex\.\d+[^:]*:\s*/, '').replace(/_{2,}|…+/g,', ').replace(/\b(sb|sth)\b/gi,m=>m.toLowerCase()==='sb'?'somebody':'something').replace(/\s+/g,' ').trim();if(!txt)return;stop();
 if(kind && !state.voice){mp3(kind,current);return;}const serial=audioSerial;let v=voices.find(x=>x.voiceURI===state.voice)||voices.find(x=>/^en-gb$/i.test(x.lang))||voices[0];
 // Use an included local MP3 when the browser reports no English voice. Works offline.
 if(!('speechSynthesis' in window)||!v){if(kind){mp3(kind,current);return;}statusAudio('Chưa có giọng đọc tiếng Anh. Bấm Thử MP3 trong phần giọng đọc hoặc cài giọng English trên thiết bị.');return;}
 let u=new SpeechSynthesisUtterance(txt);activeUtterance=u;u.lang=v.lang;u.voice=v;u.rate=Number(state.speed)||.8;u.pitch=1;
 u.onstart=()=>{if(serial===audioSerial)statusAudio('🔊 Đang đọc: '+(kind==='question'?'Câu hỏi':kind==='vocab'?'Từ vựng':'Tiếng Anh'));};
 u.onend=()=>{if(serial===audioSerial){statusAudio('✓ Đã đọc xong · Có thể nghe lại');activeUtterance=null;}};
 u.onerror=e=>{if(serial!==audioSerial)return;activeUtterance=null;if(kind){mp3(kind,current)}else statusAudio('Giọng đọc lỗi: '+e.error+' · Hãy thử MP3');};
 statusAudio('🔊 Đang khởi động giọng tiếng Anh…');speechSynthesis.speak(u);
 // Some browsers leave synthesis permanently pending without calling onerror.
 audioTimer=setTimeout(()=>{if(serial===audioSerial && activeUtterance===u && !speechSynthesis.speaking && kind)mp3(kind,current)},2600);
}
function stats(){const a=summary(),first=a.filter(x=>x.firstCorrect).length,mastered=a.filter(x=>x.mastered).length,wrong=a.filter(x=>x.wrong).length,done=a.length;const list=[['Đã học',done+'/100'],['Đúng lần đầu',first],['Đã thuộc',mastered],['Cần ôn lại',wrong]];$('stats').innerHTML=list.map(([k,v])=>`<div class="stat"><b>${v}</b><span>${k}</span></div>`).join('');$('stages').innerHTML=Array.from({length:10},(_,i)=>{const start=i*10+1,end=start+9;const count=Array.from({length:10},(_,j)=>state.results[start+j]).filter(Boolean).length;return `<button class="stage" data-stage="${start}"><small>CHẶNG ${i+1}</small><b>Câu ${start}–${end}</b><small>${count}/10 đã học</small><div class="mini-track"><div style="width:${count*10}%"></div></div></button>`}).join('');document.querySelectorAll('[data-stage]').forEach(b=>b.onclick=()=>startMode('guided',Number(b.dataset.stage)));}
function home(){stop();$('learn').classList.add('hidden');$('home').classList.remove('hidden');stats();window.scrollTo(0,0)}
function startMode(m,start){mode=m;sequence=(m==='wrong'?LESSONS.filter(x=>state.results[x.id]?.wrong).map(x=>x.id):m==='exam'?LESSONS.filter(x=>x.verified).map(x=>x.id):LESSONS.map(x=>x.id));if(!sequence.length){alert(m==='wrong'?'Chưa có câu sai cần ôn.':'Chưa có câu có thể chấm.');return}position=Math.max(0,sequence.indexOf(start));if(sequence.indexOf(start)===-1)position=0;showLesson();$('home').classList.add('hidden');$('learn').classList.remove('hidden');window.scrollTo(0,0)}
function result(id){return state.results[id]||(state.results[id]={attempts:0,firstCorrect:false,mastered:false,wrong:false,seen:false})}
function showLesson(){stop();current=sequence[position];state.last=current;save();selected='';checked=false;started=false;needsHint=false;const l=lesson(current);$('lessonCounter').textContent=`Câu ${current}/100`;$('lessonUnit').textContent=`Unit ${l.unit}`;$('modeName').textContent=({guided:'Học có hướng dẫn',recall:'Luyện nhớ',exam:'Thi thử',wrong:'Ôn câu sai'})[mode];$('progressFill').style.width=`${current}%`;$('picTitle').textContent=`HÌNH MINH HỌA ${String(current).padStart(3,'0')}`;$('lessonImage').src=l.image;$('lessonImage').alt=`Hình minh họa câu ${current}`;$('lessonTag').textContent=`UNIT ${l.unit} · CÂU ${current}`;$('wordHeading').textContent=mode==='exam'?'Đề cương gốc':'Học nhanh trước khi làm bài';$('words').innerHTML=l.vocabulary.map(x=>`<div class="word-line"><div><strong>${ESC(x.en)}</strong><small>${ESC(x.vi)}</small></div><button class="audio-btn" data-say="${ESC(x.en)}" title="Nghe từ vựng" aria-label="Nghe ${ESC(x.en)}">🔊</button></div>`).join('');$('tip').textContent=l.vocabulary.length?'Nhớ từ khóa: '+l.vocabulary[0].en+' · '+l.vocabulary[0].vi:'';
 $('learn').classList.toggle('hidden-meaning',mode==='recall'||mode==='exam');document.querySelector('.picture-card').classList.toggle('hidden',mode==='exam');$('words').classList.toggle('hidden',mode==='exam');$('tip').classList.toggle('hidden',mode==='exam');$('learnActions').classList.toggle('hidden',mode==='exam');$('exercise').classList.toggle('hidden',mode!=='exam');if(mode==='exam')renderExercise();$('prevBtn').disabled=position===0;$('nextBtn').textContent=position===sequence.length-1?'Hoàn thành ✓':'Câu tiếp theo →';$('feedback').classList.add('hidden');$('pictureSound').onclick=()=>speak(l.vocabulary.map(x=>x.en).join(". "),"vocab");document.querySelectorAll('[data-say]').forEach(btn=>btn.onclick=()=>speak(btn.dataset.say,"vocab"));window.scrollTo(0,0)}
function renderExercise(){started=true;const l=lesson(current);$('exercise').classList.remove('hidden');$('instruction').textContent=l.instruction;$('questionText').textContent=l.question;$('checkBtn').disabled=false;$('checkBtn').textContent='KIỂM TRA ĐÁP ÁN';$('feedback').className='feedback hidden';selected='';checked=false;const opts=Object.entries(l.options||{});if(opts.length===4){$('answerArea').innerHTML=opts.map(([key,value])=>`<button class="option" data-answer="${key}"><span><span class="letter">${key}.</span>${ESC(value)}</span><span class="audio-btn" data-option-say="${ESC(value)}" title="Nghe đáp án">🔊</span></button>`).join('');document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=e=>{if(e.target.closest('[data-option-say]'))return;if(checked)return;selected=b.dataset.answer;document.querySelectorAll('[data-answer]').forEach(t=>t.classList.toggle('selected',t===b))});document.querySelectorAll('[data-option-say]').forEach(b=>b.onclick=e=>{e.stopPropagation();speak(b.dataset.optionSay,'option_'+b.parentElement.dataset.answer)});}else if(l.type==='truefalse'){$('answerArea').innerHTML='<button class="option" data-answer="True">True – Đúng</button><button class="option" data-answer="False">False – Sai</button>';document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>{if(checked)return;selected=b.dataset.answer;document.querySelectorAll('[data-answer]').forEach(x=>x.classList.toggle('selected',x===b));});}else if(l.type==='reference'){$('answerArea').innerHTML='<p class="hint">Đây là câu dẫn hoặc dữ liệu đọc hiểu, không phải câu trắc nghiệm độc lập. Hãy đọc và ghi nhớ; không tự đặt đáp án.</p>';}else{$('answerArea').innerHTML='<label for="writtenAnswer" class="hint">'+(l.type==='correction'?'Viết lại câu sau khi sửa lỗi:':'Điền phần còn thiếu hoặc viết lại câu:')+'</label><textarea id="writtenAnswer" class="answer-box" placeholder="Nhập câu trả lời tại đây…"></textarea>';}result(current).seen=true;save();}
function normalize(s){return String(s||'').toLowerCase().replace(/[‘’]/g,"'").replace(/[^\p{L}\p{N}]+/gu,' ').trim().replace(/\s+/g,' ')}
function check(){if(checked)return;const l=lesson(current);if(l.type==='reference'){feedback('info','Mục ghi nhớ','Đây là nội dung dẫn từ đề cương; không có câu hỏi độc lập để chấm. Hãy ghi nhớ và chuyển câu.');checked=true;$('checkBtn').disabled=true;return}
 if(['rewrite','correction'].includes(l.type))selected=$('writtenAnswer')?.value.trim()||'';if(!selected){alert('Hãy chọn hoặc nhập câu trả lời trước nhé!');return}checked=true;const r=result(current);r.attempts++;let isRight=false;if(l.answer)isRight=selected===l.answer;else if(l.accepted.length){const s=normalize(selected);isRight=l.accepted.some(a=>normalize(a)===s||normalize(a).includes(s)&&s.length>8)}
 if(!l.verified){r.wrong=false;feedback('info','Cần xác minh đáp án','Bản Word chưa đủ căn cứ chấm chính xác mục này. Đáp án của bạn được giữ lại để học tập, không tính đúng hoặc sai.');}else if(isRight){if(r.attempts===1)r.firstCorrect=true;if(!needsHint)r.mastered=true;r.wrong=false;const solution=l.answer?l.options[l.answer]:l.accepted[0];feedback('good','Chính xác! 🎉',`Đáp án: ${solution}. ${l.vocabulary[0]?.en||''} – ${l.vocabulary[0]?.vi||''}.`);}
 else{r.wrong=true;r.mastered=false;const solution=l.answer?`${l.answer}. ${l.options[l.answer]}`:l.accepted[0];feedback('bad','Chưa đúng – mình ôn lại nhé!',`Đáp án tham khảo: ${solution||'Xem chú thích của giáo viên'}. Hãy nhìn lại hình, nghe từ vựng và ghi nhớ cách dùng. Trong lượt ôn tiếp theo, cố gắng làm đúng mà không cần gợi ý.`);}
 if(l.answer){document.querySelectorAll('[data-answer]').forEach(b=>{if(b.dataset.answer===l.answer)b.classList.add('correct');else if(b.dataset.answer===selected&&!isRight)b.classList.add('wrong')});}$('checkBtn').disabled=true;save();}
function feedback(type,title,message){const f=$('feedback');f.className='feedback '+(type==='bad'?'bad':type==='info'?'warn':'');const l=lesson(current);const full=buildFullSentence(l);const vi=sentenceTranslation(l);f.innerHTML=`<h3>${ESC(title)}</h3><p>${ESC(message)}</p>${l.verified?`<p><b>Nhớ:</b> ${ESC(l.vocabulary.map(x=>x.en+' = '+x.vi).join(' · '))}</p>`:''}<div class="correct-sentence"><b>Câu đúng:</b> ${ESC(full)}</div><div class="translation-line"><b>Câu dịch:</b> ${ESC(vi)}</div><button class="small-btn listen-correct" id="hearCorrect">🔊 Nghe câu đúng / câu gốc</button>`;$('hearCorrect').onclick=()=>speak(full,'correct');}
function next(d){if(d===1&&position>=sequence.length-1){home();return}let next=position+d;if(next<0||next>=sequence.length)return;position=next;showLesson();}
$('homeBtn').onclick=home;$('backBtn').onclick=home;$('startBtn').onclick=()=>startMode('guided',state.last||1);$('guidedBtn').onclick=()=>startMode('guided',1);$('recallBtn').onclick=()=>startMode('recall',1);$('examBtn').onclick=()=>startMode('exam',1);$('wrongBtn').onclick=()=>startMode('wrong',1);$('revealQuestion').onclick=()=>{renderExercise();$('exercise').scrollIntoView({behavior:'smooth',block:'start'})};$('checkBtn').onclick=check;$('nextBtn').onclick=()=>next(1);$('prevBtn').onclick=()=>next(-1);$('playQuestion').onclick=()=>speak(lesson(current).question,"question");$('settingsBtn').onclick=()=>openModal('settingsModal');$('zoomBtn').onclick=()=>{$('bigImage').src=lesson(current).image;openModal('imageModal')};$('jumpBtn').onclick=()=>{$('jumpGrid').innerHTML=LESSONS.map(x=>`<button class="${x.id===current?'active':''}" data-jump="${x.id}">${x.id}</button>`).join('');document.querySelectorAll('[data-jump]').forEach(b=>b.onclick=()=>{let id=Number(b.dataset.jump);if(!sequence.includes(id)){sequence=LESSONS.map(x=>x.id)}position=sequence.indexOf(id);closeModal('selectModal');showLesson()});openModal('selectModal')};document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>closeModal(b.dataset.close));document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModal(m.id)}));$('studentName').value=state.name;$('studentClass').value=state.className;$('studentName').oninput=e=>{state.name=e.target.value;save()};$('studentClass').oninput=e=>{state.className=e.target.value;save()};$('speed').value=String(state.speed);$('speed').onchange=e=>{state.speed=Number(e.target.value);save()};$('voice').onchange=e=>{state.voice=e.target.value;save()};$('testVoice').onclick=()=>speak('Hello! Welcome to English six. Let us learn together.');$('stopVoice').onclick=()=>{stop();statusAudio('■ Đã dừng âm thanh')};$('useMp3').onclick=()=>mp3('vocab',current);
loadVoices();document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});if('speechSynthesis' in window)speechSynthesis.onvoiceschanged=loadVoices;stats();
