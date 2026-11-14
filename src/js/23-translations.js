/* ---------------- translations: English text in the DOM, swept into ru (same idea as BEHEMOTH) ---------------- */
var TR=[
 /* chrome */
 ['Load','Файл'],['● REC','● ЗАПИСЬ'],['■ STOP','■ СТОП'],
 ['No sample','Нет сэмпла'],['Drag knobs','Тяни ручки'],['Double-tap to reset','Двойной тап — сброс'],
 ['Demo','Демо'],['Mono','Моно'],['Stereo','Стерео'],
 /* cards */
 ['Sample','Сэмпл'],['Grain','Зерно'],['Motion','Движение'],['Envelope','Огибающая'],
 ['Filter','Фильтр'],['Output','Выход'],['Echo','Эхо'],['Space','Пространство'],
 ['Surface','Поверхность'],['Controls','Управление'],['Source','Источник'],['Display','Дисплей'],
 ['About','О приложении'],['Settings','Настройки'],['Language','Язык'],['Tips','Подсказки'],
 ['Tutorial','Туториал'],['Interface','Интерфейс'],['Text size','Размер текста'],['Contrast','Контраст'],
 
 ['Normal','Обычный'],['Large','Крупный'],['High','Высокий'],
 ['↶ TAKE','↶ ДУБЛЬ'],['Level','Уровень'],['Simple','Простой'],['Full','Полный'],['Simple interface','Простой интерфейс'],['Full interface','Полный интерфейс'],
 ['Reset interface','Сбросить интерфейс'],['Interface reset','Интерфейс сброшен'],
 ['EXPORT','ЭКСПОРТ'],['IMPORT','ИМПОРТ'],['DRIVE','ДРАЙВ'],
 ['No user presets to export','Нет своих пресетов для экспорта'],['Not a GRAINS preset file','Это не файл пресетов GRAINS'],['Play tutorial','Пройти туториал'],['Auto','Авто'],['On','Вкл'],['Off','Выкл'],
 ['Drag: X = position · Y = spray (up = wider)','Тяни: X = позиция · Y = разброс (выше = шире)'],
 ['X = position','X = позиция'],
 ['Tap: recall · hold: store','Тап: вызвать · удержание: сохранить'],
 ['Y: SPRAY','Y: РАЗБРОС'],['Y: SIZE','Y: РАЗМЕР'],['Y: DENSITY','Y: ПЛОТНОСТЬ'],['Y: CUTOFF','Y: СРЕЗ'],['Y: PITCH','Y: ВЫСОТА'],
 /* knobs */
 ['Position','Позиция'],['Spray','Разброс'],['Size','Размер'],['Density','Плотность'],['Pitch','Высота'],
 ['Detune','Детюн'],['Reverse','Реверс'],['Shape','Форма'],['Scan','Скан'],['Width','Ширина'],
 ['Attack','Атака'],['Release','Спад'],['Cutoff','Срез'],['Reso','Резон.'],['Level','Уровень'],
 ['D.TIME','ЭХО ВР.'],['D.FEEDB','ЭХО ОС'],['Delay','Эхо'],['Reverb','Реверб'],
 /* dock, nav */
 ['Hold','Держать'],['RND','СЛУЧ'],['Tone','Тон'],['Play','Игра'],
 ['Octave down','Октава вниз'],['Octave up','Октава вверх'],['Previous preset','Предыдущий пресет'],['Next preset','Следующий пресет'],
 /* sample tab */
 ['No sample loaded.','Сэмпл не загружен.'],
 ['Load any audio file, or record from the microphone. Short loops and sustained sounds make the best clouds.','Загрузи любой аудиофайл или запиши звук с микрофона. Лучше всего облака получаются из коротких лупов и протяжных звуков.'],
 ['Granular sampler. Position and spray choose where grains come from, size and density shape the cloud, scan moves through the sample. Hold several keys for a chord cloud.','Гранулярный сэмплер. Позиция и разброс определяют, откуда берутся зёрна, размер и плотность формируют облако, скан двигается по сэмплу. Зажми несколько клавиш — получится аккордовое облако.'],
 ['White','Белый'],['Silver','Серебро'],['Dim','Тусклый'],
 /* presets, snapshots */
 ['Presets','Пресеты'],['Close','Закрыть'],['Save','Сохранить'],['Name','Имя'],['Factory','Заводской'],['User','Мой'],['Random','Случайный'],
 ['Cloud','Облако'],['Stretch','Растяжка'],['Freeze','Заморозка'],['Shimmer','Мерцание'],['Glitch','Глитч'],['Rain','Дождь'],['Sub drift','Саб-дрейф'],['Dust','Пыль'],
 ['Stored','Сохранён'],['Empty','Пусто'],
 /* toasts, splash */
 ['Audio running','Звук запущен'],['Could not decode that file','Не удалось прочитать файл'],
 ['Recording… tap again to stop','Идёт запись… нажми ещё раз, чтобы остановить'],
 ['Recording is not available here','Запись здесь недоступна'],['Microphone unavailable','Микрофон недоступен'],
 ['Tips off — turn them on in ≡','Подсказки выключены — включи их в меню ≡'],
 ['touch anywhere to start','коснись экрана, чтобы начать'],['headphones recommended','лучше в наушниках'],['starting audio…','запускаю звук…'],
 ['Macros','Макросы'],['Hold a knob to choose what it controls','Удерживай ручку, чтобы выбрать, чем она управляет'],['Macro 1 controls','Макрос 1 управляет'],['Macro 2 controls','Макрос 2 управляет'],
 /* tour */
 ['Skip','Пропустить'],['Back','Назад'],['Next','Далее'],['Done','Готово'],['Got it','Понятно'],['Turn off tips','Выключить подсказки'],
 ['Welcome','Добро пожаловать'],['Grain settings','Настройки зёрен'],['Keys','Клавиши'],['Screens','Экраны'],['Sound source','Источник звука'],['Landscape','Горизонтальный режим'],
 ['GRAINS is a granular sampler. It plays thousands of tiny grains of a sound to build clouds, textures and frozen moments. This short tour shows the essentials. Replay it any time from ≡ → Tutorial.',
  'GRAINS — гранулярный сэмплер. Он проигрывает тысячи крошечных зёрен звука и складывает из них облака, текстуры и «замороженные» моменты. Короткий тур покажет главное. Его можно пройти снова в любой момент: ≡ → Туториал.'],
 ['The sample, drawn as dots. Drag across it: left and right move the position grains are taken from, up and down widen the spray. The bright dots are the part being played.',
  'Сэмпл, нарисованный точками. Води пальцем: влево-вправо двигает позицию, откуда берутся зёрна, вверх-вниз расширяет разброс. Яркие точки — та часть, что сейчас играет.'],
 ['SIZE is how long each grain lasts, DENSITY how many play per second. Short grains and high density give smooth textures, long and sparse ones stay recognisable. Drag a knob up or down, double-tap to reset it.',
  'РАЗМЕР — длина каждого зерна, ПЛОТНОСТЬ — сколько зёрен играет в секунду. Короткие зёрна и высокая плотность дают гладкие текстуры, длинные и редкие остаются узнаваемыми. Тяни ручку вверх или вниз, двойной тап сбрасывает значение.'],
 ['Tap the keys to play pitches, hold several for a chord cloud. HOLD keeps the cloud going by itself, OCT shifts the octave and RND randomises the grain settings.',
  'Нажимай клавиши, чтобы менять высоту, зажми несколько — получится аккордовое облако. ДЕРЖАТЬ оставляет облако звучать само, ОКТ сдвигает октаву, СЛУЧ случайно меняет настройки зёрен.'],
 ['Tap the name to browse presets or save your own, or use the arrows to step through them.',
  'Нажми на название, чтобы открыть список пресетов или сохранить свой, либо листай стрелками.'],
 ['GRAIN shapes the cloud. TONE adds scan, filter, envelope, echo and reverb. PLAY is a big touch surface with four snapshots. SAMPLE loads or records sound and holds the settings.',
  'ЗЕРНО формирует облако. ТОН добавляет скан, фильтр, огибающую, эхо и реверб. ИГРА — большая сенсорная поверхность с четырьмя снимками. СЭМПЛ загружает и записывает звук, здесь же настройки.'],
 ['SCAN moves the position through the sample by itself. Slow values stretch the sound in time, zero freezes the cloud in place.',
  'СКАН сам двигает позицию по сэмплу. Малые значения растягивают звук во времени, ноль замораживает облако на месте.'],
 ['Touch the surface to play. X is the position, Y controls the parameter chosen below it. Hold a SNAP pad to store all settings, tap it to recall them.',
  'Касайся поверхности, чтобы играть. X — позиция, Y управляет параметром, выбранным ниже. Удержи пэд СНИМОК, чтобы сохранить все настройки, тапни — чтобы вызвать их.'],
 ['LOAD brings in any audio file, REC records from the microphone. Short loops and sustained sounds make the best clouds.',
  'ФАЙЛ загружает любой аудиофайл, ЗАПИСЬ пишет с микрофона. Лучше всего облака получаются из коротких лупов и протяжных звуков.'],
 ['Turn the phone sideways for the wide layout: the screens move to a rail on the left and the keys stay under the sample.',
  'Поверни телефон горизонтально — получится широкий режим: экраны переедут на панель слева, а клавиши останутся внизу.'],
 /* tips */
 ['Drag the sample to choose where grains come from. Short SIZE and high DENSITY make smooth clouds; add SPRAY for texture.',
  'Води по сэмплу, чтобы выбрать, откуда берутся зёрна. Малый РАЗМЕР и высокая ПЛОТНОСТЬ дают гладкие облака, РАЗБРОС добавляет фактуру.'],
 ['SCAN drifts through the sample on its own. The filter, echo and reverb then shape the cloud.',
  'СКАН сам дрейфует по сэмплу. Фильтр, эхо и реверб потом лепят облако.'],
 ['Touch the surface to play. Hold a SNAP pad to store the current sound, tap it to recall.',
  'Касайся поверхности, чтобы играть. Удержи пэд СНИМОК, чтобы сохранить текущий звук, тапни — чтобы вызвать.'],
 ['Load an audio file or record your own. Sustained sounds and short loops work best.',
  'Загрузи аудиофайл или запиши свой звук. Лучше всего подходят протяжные звуки и короткие лупы.'],
 ["Undo", "Отмена"],
 ["Redo", "Повтор"],
 ["Mod", "Мод"],
 ["Seq", "Секв"],
 ["■ LOOP", "■ ПЕТЛЯ"],
 ["▶ LOOP", "▶ ПЕТЛЯ"],
 ["Edit", "Правка"],
 ["Export", "Экспорт"],
 ["Gesture", "Жест"],
 ["Target", "Цель"],
 ["Scale", "Строй"],
 ["Root", "Тоника"],
 ["Tempo", "Темп"],
 ["Rate", "Скорость"],
 ["Arpeggiator", "Арпеджиатор"],
 ["Sequencer", "Секвенсор"],
 ["Mode", "Режим"],
 ["Octaves", "Октавы"],
 ["Length", "Длина"],
 ["Grab last", "Захват"],
 ["Demo sounds", "Демо-звуки"],
 ["Gate", "Гейт"],
 ["Sin", "Син"],
 ["Tri", "Треуг"],
 ["Sqr", "Квадр"],
 ["Saw", "Пила"],
 ["S&H", "S&H"],
 ["Pos", "Поз"],
 ["Dens", "Плотн"],
 ["Cut", "Срез"],
 ["Rev", "Реверс"],
 ["Chrom", "Хром"],
 ["Major", "Мажор"],
 ["Minor", "Минор"],
 ["Dorian", "Дорийский"],
 ["Pent", "Пента"],
 ["Min pent", "Мин. пента"],
 ["Whole", "Целотон."],
 ["Blues", "Блюз"],
 ["Arp off", "АРП ВЫКЛ"],
 ["Arp on", "АРП ВКЛ"],
 ["Seq off", "СЕКВ ВЫКЛ"],
 ["Seq on", "СЕКВ ВКЛ"],
 ["Up", "Вверх"],
 ["Down", "Вниз"],
 ["Up-dn", "Вв-вн"],
 ["Rand", "Случ."],
 ["Order", "Порядок"],
 ["Clear", "Сброс"],
 ["Armed", "Жду"],
 ["No gesture", "Нет жеста"],
 ["Preview", "Прослушать"],
 ["Crop", "Обрезать"],
 ["Remove", "Удалить"],
 ["Trim sil.", "Тишина"],
 ["Full", "Всё"],
 ["Normalize", "Нормализ."],
 ["Fade in", "Нараст."],
 ["Fade out", "Затух."],
 ["Snap", "Привязка"],
 ["Cropped", "Обрезано"],
 ["Removed", "Удалено"],
 ["Silence trimmed", "Тишина убрана"],
 ["Normalized", "Нормализовано"],
 ["Reversed", "Развёрнуто"],
 ["Faded", "Фейд добавлен"],
 ["Nothing to crop", "Нечего обрезать"],
 ["Nothing to trim", "Нечего убирать"],
 ["Select a smaller region to cut", "Выбери область поменьше"],
 ["Drag the handles: loop region", "Тяни ручки: область лупа"],
 ["swipe: select", "свайп: выделить"],
 ["pinch: zoom", "щипок: зум"],
 ["double-tap: reset zoom", "двойной тап: сброс зума"],
 ["● REC OUT", "● ЗАП. ВЫХОДА"],
 ["Save wav", "Сохр. WAV"],
 ["REC OUT records everything you hear and saves it as a 16-bit stereo WAV. SAVE WAV writes the current sample.", "ЗАП. ВЫХОДА пишет всё, что ты слышишь, и сохраняет 16-битный стерео WAV. СОХР. WAV сохраняет текущий сэмпл."],
 ["Enable MIDI", "Включить MIDI"],
 ["Learn", "Назначить"],
 ["Notes, pitch bend and sustain pedal play the sampler. Tap LEARN, touch a knob, then move a controller to map it.", "Ноты, питч-бенд и педаль сустейна играют сэмплером. Нажми НАЗНАЧИТЬ, коснись ручки и подвигай контроллер, чтобы привязать его."],
 ["No MIDI inputs found", "MIDI-входы не найдены"],
 ["Web MIDI is not supported in this browser", "Web MIDI не поддерживается в этом браузере"],
 ["MIDI access was denied", "Доступ к MIDI запрещён"],
 ["Touch a knob, then move a controller", "Коснись ручки, затем подвигай контроллер"],
 ["Move a MIDI controller", "Подвигай MIDI-контроллер"],
 ["MIDI learn off", "Назначение MIDI выключено"],
 ["Nothing recorded", "Ничего не записано"],
 ["Start the audio first", "Сначала запусти звук"],
 ["Recording the output…", "Пишу выход…"],
 ["Generating…", "Генерирую…"],
 ["Frozen: position locked", "Заморожено: позиция зафиксирована"],
 ["Unfrozen", "Разморожено"],
 ["Record a gesture first", "Сначала запиши жест"],
 ["Rec", "Запись"],
 ["Pad", "Пэд"],
 ["Glass", "Стекло"],
 ["Choir", "Хор"],
 ["Wind", "Ветер"],
 ["Pluck", "Щипок"],
 ["Drift", "Дрейф"],
 ["Wobble", "Качание"],
 ["Swarm", "Рой"],
 ["Depth 0 switches an LFO off. The LFOs move the grain settings around the values of the knobs, so the cloud keeps changing by itself.", "Глубина 0 выключает LFO. LFO двигают настройки зёрен вокруг значений ручек, так что облако меняется само."],
 ["Keys, MIDI and Y: PITCH follow the scale", "Клавиши, MIDI и Y: ВЫСОТА следуют строю"],
 ["Shared by the arpeggiator and the sequencer", "Общий для арпеджиатора и секвенсора"],
 ["Hold keys to arpeggiate them", "Держи клавиши, чтобы арпеджировать их"],
 ["Tap a step to switch it", "тап по шагу включает его"],
 ["drag in the grid to set its note", "тяни по сетке, чтобы задать ноту"],
 ["keys transpose", "клавиши транспонируют"],
 ["Load any audio file or record from the microphone. GRAB turns the last seconds of what you hear into a new sample. Short loops and sustained sounds make the best clouds.", "Загрузи любой аудиофайл или запиши звук с микрофона. ЗАХВАТ превращает последние секунды того, что ты слышишь, в новый сэмпл. Лучше всего облака получаются из коротких лупов и протяжных звуков."],
 ["Modulation", "Модуляция"],
 ["Edit sample", "Правка сэмпла"],
 ["Arp and sequencer", "Арп и секвенсор"],
 ["Tap the keys to play pitches, hold several for a chord cloud. HOLD keeps the cloud going by itself, FREEZE also locks the position, OCT shifts the octave and RND randomises the grain settings. The arrows at the top undo and redo.", "Нажимай клавиши, чтобы менять высоту, зажми несколько — получится аккордовое облако. ДЕРЖАТЬ оставляет облако звучать само, ЗАМОРОЗКА ещё и фиксирует позицию, ОКТ сдвигает октаву, СЛУЧ случайно меняет настройки зёрен. Стрелки сверху — отмена и повтор."],
 ["GRAIN shapes the cloud. TONE adds scan, filter, envelope, echo and reverb. MOD has two LFOs. PLAY is a big touch surface with snapshots and gesture loops. SEQ has the scale, arpeggiator and sequencer. SAMPLE loads, records, edits and exports sound and holds the settings.", "ЗЕРНО формирует облако. ТОН добавляет скан, фильтр, огибающую, эхо и реверб. МОД — два LFO. ИГРА — большая сенсорная поверхность со снимками и петлями жестов. СЕКВ — строй, арпеджиатор и секвенсор. СЭМПЛ загружает, записывает, правит и экспортирует звук, здесь же настройки."],
 ["Two LFOs move the grain settings by themselves. Pick a shape and a target, then raise DEPTH. RATE sets how fast it moves.", "Два LFO сами двигают настройки зёрен. Выбери форму и цель, затем подними ГЛУБИНУ. СКОРОСТЬ задаёт, как быстро это движется."],
 ["REC arms the recorder: touch the surface, move around, then tap STOP. LOOP replays your movement, so your hands are free for the knobs.", "ЗАПИСЬ включает рекордер: коснись поверхности, подвигай пальцем и нажми СТОП. ПЕТЛЯ повторяет твоё движение, а руки свободны для ручек."],
 ["Pick a root and a scale: the keys, MIDI and Y: PITCH snap to it, so every cloud stays in tune.", "Выбери тонику и строй: клавиши, MIDI и Y: ВЫСОТА подстроятся под него, и любое облако останется в строю."],
 ["Hold keys with ARP on to arpeggiate them, or start SEQ: tap a step to switch it, drag in the grid to set its note. Keys transpose the pattern. TEMPO and RATE are shared.", "Держи клавиши при включённом АРП, чтобы арпеджировать их, или запусти СЕКВ: тапай шаги, тяни по сетке, чтобы задать ноту. Клавиши транспонируют паттерн. ТЕМП и СКОРОСТЬ общие."],
 ["The loop region is where the grains are read from. Drag its two handles, swipe on empty space to select a region, pinch to zoom, double-tap to reset the zoom. CROP, REMOVE and the other tools change the sample itself, and the arrows at the top undo them.", "Область лупа — это место, откуда читаются зёрна. Тяни две ручки, свайпай по пустому месту, чтобы выделить область, щипком меняй масштаб, двойной тап сбрасывает зум. ОБРЕЗАТЬ, УДАЛИТЬ и другие инструменты меняют сам сэмпл, а стрелки сверху их отменяют."],
 ["LOAD brings in any audio file, REC records from the microphone. GRAB keeps the last seconds of what you hear and turns them into a new sample.", "ФАЙЛ загружает любой аудиофайл, ЗАПИСЬ пишет с микрофона. ЗАХВАТ сохраняет последние секунды того, что ты слышишь, как новый сэмпл."],
 ["Raise DEPTH to wake an LFO up. Slow rates make the cloud breathe, fast ones make it flutter.", "Подними ГЛУБИНУ, чтобы оживить LFO. Медленные скорости заставляют облако дышать, быстрые — трепетать."],
 ["Touch the surface to play. REC records a gesture you can loop. Hold a SNAP pad to store the current sound, tap it to recall.", "Касайся поверхности, чтобы играть. ЗАПИСЬ пишет жест, который можно зациклить. Удержи пэд СНИМОК, чтобы сохранить текущий звук, тапни — чтобы вызвать."],
 ["Pick a scale to keep everything in tune. Hold keys with ARP on, or start SEQ. Keys transpose the sequence.", "Выбери строй, чтобы всё звучало чисто. Держи клавиши при включённом АРП или запусти СЕКВ. Клавиши транспонируют последовательность."],
 ["Load an audio file, record your own or generate a demo. Drag the handles on the waveform to choose the loop region.", "Загрузи аудиофайл, запиши свой звук или создай демо. Тяни ручки на волне, чтобы выбрать область лупа."]
];
var TR_RULES=[
 [/^LFO(\d) RATE$/,{ru:'LFO$1 СКОР.',es:'LFO$1 VEL.'}],
 [/^LFO(\d) DEPTH$/,{ru:'LFO$1 ГЛУБ.',es:'LFO$1 PROF.'}],
 [/^(\d) OCT$/,{ru:'$1 ОКТ',es:'$1 OCT'}],
 [/^GAIN ([-+])$/,{ru:'УСИЛ. $1',es:'GAN. $1'}],
 [/^■ STOP (\d+:\d\d)$/,{ru:'■ СТОП $1',es:'■ PARAR $1'}],
 [/^Recorded (.+)$/,{ru:'Записано: $1',es:'Grabado: $1'}],
 [/^Grabbed the last (.+)$/,{ru:'Захвачено последних: $1',es:'Capturados los últimos: $1'}],
 [/^GRAB (\d+)S$/,{ru:'ЗАХВАТ $1С',es:'CAPT. $1S'}],
 [/^Region (.+)$/,{ru:'Область $1',es:'Región $1'}],
 [/^(\d+) MIDI input\(s\) connected$/,{ru:'Подключено MIDI-входов: $1',es:'Entradas MIDI conectadas: $1'}],
 [/^Loaded (.+)$/,{ru:'Загружено: $1',es:'Cargado: $1'}],
 [/^Stored snap (\d)$/,{ru:'Снимок $1 сохранён',es:'Escena $1 guardada'}],
 [/^Saved (.+)$/,{ru:'Сохранено: $1',es:'Guardado: $1'}],
 [/^SNAP (\d)$/,{ru:'СНИМОК $1',es:'ESCENA $1'}],
 [/^OCT ([+-]?\d)$/,{ru:'ОКТ $1',es:'OCT $1'}],
 [/^USER (\d+)$/,{ru:'МОЙ $1',es:'USUARIO $1'}],
 [/^Imported (\d+) presets?$/,{ru:'Импортировано пресетов: $1',es:'Presets importados: $1'}],
 [/^Audio could not start: (.+)$/,{ru:'Не удалось запустить звук: $1',es:'No se pudo iniciar el audio: $1'}]
];
var I18N={ru:{}},I18N_LC={ru:{}},curLang='en',i18nRec=new WeakMap(),i18nObs=null;
TR.forEach(function(r){I18N.ru[r[0]]=r[1]});
['ru'].forEach(function(l){for(var k in I18N[l])I18N_LC[l][k.toLowerCase()]=I18N[l][k]});
function trPiece(k){
  var t=I18N[curLang][k],i,m;
  if(t!==undefined)return t;
  t=I18N_LC[curLang][k.toLowerCase()];
  if(t!==undefined)return k===k.toUpperCase()?t.toUpperCase():t;
  for(i=0;i<TR_RULES.length;i++){m=TR_RULES[i][0].exec(k);if(m)return TR_RULES[i][1][curLang].replace(/\$(\d)/g,function(_,n){return m[+n]})}
  return undefined;
}
function trText(en){
  if(curLang==='en')return en;
  var k=en.trim(),t,parts;
  if(!k||!/[A-Za-z]/.test(k))return en;
  t=trPiece(k);
  if(t===undefined&&/( · | → )/.test(k)){
    parts=k.split(/( · | → )/);
    t=parts.map(function(p,i){return i%2?p:(trPiece(p.trim())||p)}).join('');
    if(t===k)t=undefined;
  }
  return t===undefined?en:en.replace(k,t);
}
function T(s){return trText(s)}
function i18nNode(n){
  var rec=i18nRec.get(n),en=rec&&n.nodeValue===rec.out?rec.en:n.nodeValue,out=trText(en);
  if(out!==n.nodeValue)n.nodeValue=out;
  i18nRec.set(n,{en:en,out:out});
}
var I18N_ATTR=['aria-label','placeholder','title'];
function i18nEl(el){
  I18N_ATTR.forEach(function(a){
    var v=el.getAttribute(a);if(v==null)return;
    var rec=i18nRec.get(el)||{},r=rec[a],en=r&&v===r.out?r.en:v,out=trText(en);
    if(out!==v)el.setAttribute(a,out);
    rec[a]={en:en,out:out};i18nRec.set(el,rec);
  });
}
function i18nSweep(root){
  if(root.nodeType===3){i18nNode(root);return}
  if(root.nodeType!==1||/^(SCRIPT|STYLE|TEXTAREA|CANVAS)$/.test(root.tagName))return;
  i18nEl(root);
  for(var c=root.firstChild;c;c=c.nextSibling)i18nSweep(c);
}
var I18N_OPTS={subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:I18N_ATTR};
function setLang(code){
  curLang=code==='ru'?'ru':'en';
  document.documentElement.lang=curLang;
  if(i18nObs)i18nObs.disconnect();
  i18nSweep(document.body);
  if(!i18nObs)i18nObs=new MutationObserver(function(list){
    if(curLang==='en')return;
    i18nObs.disconnect();
    list.forEach(function(m){
      if(m.type==='characterData')i18nNode(m.target);
      else if(m.type==='attributes')i18nEl(m.target);
      else m.addedNodes.forEach(i18nSweep);
    });
    i18nObs.takeRecords();i18nObs.observe(document.body,I18N_OPTS);
  });
  i18nObs.observe(document.body,I18N_OPTS);
}

