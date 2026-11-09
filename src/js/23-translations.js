/* ---------------- translations: English text in the DOM, swept into ru / es (same idea as BEHEMOTH) ---------------- */
var TR=[
 /* chrome */
 ['Load','Файл','Abrir'],['● REC','● ЗАПИСЬ','● GRABAR'],['■ STOP','■ СТОП','■ PARAR'],
 ['No sample','Нет сэмпла','Sin muestra'],['Drag knobs','Тяни ручки','Arrastra perillas'],['Double-tap to reset','Двойной тап — сброс','Doble toque: restablecer'],
 ['Demo','Демо','Demo'],['Mono','Моно','Mono'],['Stereo','Стерео','Estéreo'],
 /* cards */
 ['Sample','Сэмпл','Muestra'],['Grain','Зерно','Grano'],['Motion','Движение','Movimiento'],['Envelope','Огибающая','Envolvente'],
 ['Filter','Фильтр','Filtro'],['Output','Выход','Salida'],['Echo','Эхо','Eco'],['Space','Пространство','Espacio'],
 ['Surface','Поверхность','Superficie'],['Controls','Управление','Controles'],['Source','Источник','Fuente'],['Display','Дисплей','Pantalla'],
 ['About','О приложении','Acerca de'],['Settings','Настройки','Ajustes'],['Language','Язык','Idioma'],['Tips','Подсказки','Consejos'],
 ['Tutorial','Туториал','Tutorial'],['Interface','Интерфейс','Interfaz'],['Text size','Размер текста','Tamaño de texto'],['Contrast','Контраст','Contraste'],
 
 ['Normal','Обычный','Normal'],['Large','Крупный','Grande'],['High','Высокий','Alto'],
 ['Reset interface','Сбросить интерфейс','Restablecer interfaz'],['Interface reset','Интерфейс сброшен','Interfaz restablecida'],
 ['EXPORT','ЭКСПОРТ','EXPORTAR'],['IMPORT','ИМПОРТ','IMPORTAR'],['DRIVE','ДРАЙВ','DRIVE'],
 ['No user presets to export','Нет своих пресетов для экспорта','No hay presets propios para exportar'],['Not a GRAINS preset file','Это не файл пресетов GRAINS','No es un archivo de presets de GRAINS'],['Play tutorial','Пройти туториал','Ver tutorial'],['Auto','Авто','Auto'],['On','Вкл','Sí'],['Off','Выкл','No'],
 ['Drag: X = position · Y = spray (up = wider)','Тяни: X = позиция · Y = разброс (выше = шире)','Arrastra: X = posición · Y = dispersión (arriba = más ancha)'],
 ['X = position','X = позиция','X = posición'],
 ['Tap: recall · hold: store','Тап: вызвать · удержание: сохранить','Toque: recuperar · mantener: guardar'],
 ['Y: SPRAY','Y: РАЗБРОС','Y: ESPARCIR'],['Y: SIZE','Y: РАЗМЕР','Y: TAMAÑO'],['Y: DENSITY','Y: ПЛОТНОСТЬ','Y: DENSIDAD'],['Y: CUTOFF','Y: СРЕЗ','Y: CORTE'],['Y: PITCH','Y: ВЫСОТА','Y: ALTURA'],
 /* knobs */
 ['Position','Позиция','Posición'],['Spray','Разброс','Esparcir'],['Size','Размер','Tamaño'],['Density','Плотность','Densidad'],['Pitch','Высота','Altura'],
 ['Detune','Детюн','Desafin.'],['Reverse','Реверс','Inverso'],['Shape','Форма','Forma'],['Scan','Скан','Barrido'],['Width','Ширина','Ancho'],
 ['Attack','Атака','Ataque'],['Release','Спад','Caída'],['Cutoff','Срез','Corte'],['Reso','Резон.','Reson.'],['Level','Уровень','Nivel'],
 ['D.TIME','ЭХО ВР.','T. ECO'],['D.FEEDB','ЭХО ОС','FB ECO'],['Delay','Эхо','Eco'],['Reverb','Реверб','Reverb'],
 /* dock, nav */
 ['Hold','Держать','Mantener'],['RND','СЛУЧ','ALEA'],['Tone','Тон','Tono'],['Play','Игра','Tocar'],
 ['Octave down','Октава вниз','Octava abajo'],['Octave up','Октава вверх','Octava arriba'],['Previous preset','Предыдущий пресет','Preset anterior'],['Next preset','Следующий пресет','Preset siguiente'],
 /* sample tab */
 ['No sample loaded.','Сэмпл не загружен.','Ninguna muestra cargada.'],
 ['Load any audio file, or record from the microphone. Short loops and sustained sounds make the best clouds.','Загрузи любой аудиофайл или запиши звук с микрофона. Лучше всего облака получаются из коротких лупов и протяжных звуков.','Carga cualquier archivo de audio o graba con el micrófono. Los bucles cortos y los sonidos sostenidos dan las mejores nubes.'],
 ['Granular sampler. Position and spray choose where grains come from, size and density shape the cloud, scan moves through the sample. Hold several keys for a chord cloud.','Гранулярный сэмплер. Позиция и разброс определяют, откуда берутся зёрна, размер и плотность формируют облако, скан двигается по сэмплу. Зажми несколько клавиш — получится аккордовое облако.','Sampler granular. Posición y dispersión eligen de dónde salen los granos, tamaño y densidad dan forma a la nube y el barrido recorre la muestra. Mantén varias teclas para una nube de acordes.'],
 ['White','Белый','Blanco'],['Silver','Серебро','Plata'],['Dim','Тусклый','Tenue'],
 /* presets, snapshots */
 ['Presets','Пресеты','Presets'],['Close','Закрыть','Cerrar'],['Save','Сохранить','Guardar'],['Name','Имя','Nombre'],['Factory','Заводской','De fábrica'],['User','Мой','Usuario'],['Random','Случайный','Aleatorio'],
 ['Cloud','Облако','Nube'],['Stretch','Растяжка','Estirado'],['Freeze','Заморозка','Congelado'],['Shimmer','Мерцание','Brillo'],['Glitch','Глитч','Glitch'],['Rain','Дождь','Lluvia'],['Sub drift','Саб-дрейф','Sub deriva'],['Dust','Пыль','Polvo'],
 ['Stored','Сохранён','Guardada'],['Empty','Пусто','Vacía'],
 /* toasts, splash */
 ['Audio running','Звук запущен','Audio en marcha'],['Could not decode that file','Не удалось прочитать файл','No se pudo decodificar el archivo'],
 ['Recording… tap again to stop','Идёт запись… нажми ещё раз, чтобы остановить','Grabando… toca de nuevo para parar'],
 ['Recording is not available here','Запись здесь недоступна','La grabación no está disponible aquí'],['Microphone unavailable','Микрофон недоступен','Micrófono no disponible'],
 ['Tips off — turn them on in SAMPLE','Подсказки выключены — включи их во вкладке СЭМПЛ','Consejos desactivados — actívalos en MUESTRA'],
 ['touch anywhere to start','коснись экрана, чтобы начать','toca la pantalla para empezar'],['headphones recommended','лучше в наушниках','se recomiendan auriculares'],['starting audio…','запускаю звук…','iniciando audio…'],
 /* tour */
 ['Skip','Пропустить','Omitir'],['Back','Назад','Atrás'],['Next','Далее','Siguiente'],['Done','Готово','Listo'],['Got it','Понятно','Entendido'],['Turn off tips','Выключить подсказки','Desactivar consejos'],
 ['Welcome','Добро пожаловать','Bienvenido'],['Grain settings','Настройки зёрен','Ajustes del grano'],['Keys','Клавиши','Teclas'],['Screens','Экраны','Pantallas'],['Sound source','Источник звука','Fuente de sonido'],['Landscape','Горизонтальный режим','Modo horizontal'],
 ['GRAINS is a granular sampler. It plays thousands of tiny grains of a sound to build clouds, textures and frozen moments. This short tour shows the essentials. Replay it any time from SAMPLE → Tutorial.',
  'GRAINS — гранулярный сэмплер. Он проигрывает тысячи крошечных зёрен звука и складывает из них облака, текстуры и «замороженные» моменты. Короткий тур покажет главное. Его можно пройти снова в любой момент: СЭМПЛ → Туториал.',
  'GRAINS es un sampler granular. Reproduce miles de granos diminutos de un sonido para crear nubes, texturas y momentos congelados. Este breve recorrido muestra lo esencial. Puedes repetirlo cuando quieras desde MUESTRA → Tutorial.'],
 ['The sample, drawn as dots. Drag across it: left and right move the position grains are taken from, up and down widen the spray. The bright dots are the part being played.',
  'Сэмпл, нарисованный точками. Води пальцем: влево-вправо двигает позицию, откуда берутся зёрна, вверх-вниз расширяет разброс. Яркие точки — та часть, что сейчас играет.',
  'La muestra, dibujada con puntos. Arrastra sobre ella: izquierda y derecha mueven la posición de donde salen los granos, arriba y abajo amplían la dispersión. Los puntos brillantes son la parte que suena.'],
 ['SIZE is how long each grain lasts, DENSITY how many play per second. Short grains and high density give smooth textures, long and sparse ones stay recognisable. Drag a knob up or down, double-tap to reset it.',
  'РАЗМЕР — длина каждого зерна, ПЛОТНОСТЬ — сколько зёрен играет в секунду. Короткие зёрна и высокая плотность дают гладкие текстуры, длинные и редкие остаются узнаваемыми. Тяни ручку вверх или вниз, двойной тап сбрасывает значение.',
  'TAMAÑO es la duración de cada grano y DENSIDAD cuántos suenan por segundo. Granos cortos y mucha densidad dan texturas suaves; largos y escasos siguen siendo reconocibles. Arrastra una perilla arriba o abajo y toca dos veces para restablecerla.'],
 ['Tap the keys to play pitches, hold several for a chord cloud. HOLD keeps the cloud going by itself, OCT shifts the octave and RND randomises the grain settings.',
  'Нажимай клавиши, чтобы менять высоту, зажми несколько — получится аккордовое облако. ДЕРЖАТЬ оставляет облако звучать само, ОКТ сдвигает октаву, СЛУЧ случайно меняет настройки зёрен.',
  'Toca las teclas para tocar notas y mantén varias para una nube de acordes. MANTENER deja la nube sonando sola, OCT cambia la octava y ALEA aleatoriza los ajustes de los granos.'],
 ['Tap the name to browse presets or save your own, or use the arrows to step through them.',
  'Нажми на название, чтобы открыть список пресетов или сохранить свой, либо листай стрелками.',
  'Toca el nombre para ver los presets o guardar el tuyo, o avanza con las flechas.'],
 ['GRAIN shapes the cloud. TONE adds scan, filter, envelope, echo and reverb. PLAY is a big touch surface with four snapshots. SAMPLE loads or records sound and holds the settings.',
  'ЗЕРНО формирует облако. ТОН добавляет скан, фильтр, огибающую, эхо и реверб. ИГРА — большая сенсорная поверхность с четырьмя снимками. СЭМПЛ загружает и записывает звук, здесь же настройки.',
  'GRANO da forma a la nube. TONO añade barrido, filtro, envolvente, eco y reverb. TOCAR es una gran superficie táctil con cuatro escenas. MUESTRA carga o graba sonido y reúne los ajustes.'],
 ['SCAN moves the position through the sample by itself. Slow values stretch the sound in time, zero freezes the cloud in place.',
  'СКАН сам двигает позицию по сэмплу. Малые значения растягивают звук во времени, ноль замораживает облако на месте.',
  'BARRIDO mueve la posición por la muestra por sí solo. Valores lentos estiran el sonido en el tiempo; cero congela la nube en su sitio.'],
 ['Touch the surface to play. X is the position, Y controls the parameter chosen below it. Hold a SNAP pad to store all settings, tap it to recall them.',
  'Касайся поверхности, чтобы играть. X — позиция, Y управляет параметром, выбранным ниже. Удержи пэд СНИМОК, чтобы сохранить все настройки, тапни — чтобы вызвать их.',
  'Toca la superficie para tocar. X es la posición e Y controla el parámetro elegido debajo. Mantén un pad ESCENA para guardar todos los ajustes y tócalo para recuperarlos.'],
 ['LOAD brings in any audio file, REC records from the microphone. Short loops and sustained sounds make the best clouds.',
  'ФАЙЛ загружает любой аудиофайл, ЗАПИСЬ пишет с микрофона. Лучше всего облака получаются из коротких лупов и протяжных звуков.',
  'ABRIR carga cualquier archivo de audio y GRABAR graba con el micrófono. Los bucles cortos y los sonidos sostenidos dan las mejores nubes.'],
 ['Turn the phone sideways for the wide layout: the screens move to a rail on the left and the keys stay under the sample.',
  'Поверни телефон горизонтально — получится широкий режим: экраны переедут на панель слева, а клавиши останутся внизу.',
  'Gira el teléfono para el modo horizontal: las pantallas pasan a una barra a la izquierda y las teclas quedan debajo.'],
 /* tips */
 ['Drag the sample to choose where grains come from. Short SIZE and high DENSITY make smooth clouds; add SPRAY for texture.',
  'Води по сэмплу, чтобы выбрать, откуда берутся зёрна. Малый РАЗМЕР и высокая ПЛОТНОСТЬ дают гладкие облака, РАЗБРОС добавляет фактуру.',
  'Arrastra por la muestra para elegir de dónde salen los granos. TAMAÑO corto y DENSIDAD alta dan nubes suaves; añade ESPARCIR para dar textura.'],
 ['SCAN drifts through the sample on its own. The filter, echo and reverb then shape the cloud.',
  'СКАН сам дрейфует по сэмплу. Фильтр, эхо и реверб потом лепят облако.',
  'BARRIDO recorre la muestra por sí solo. Después el filtro, el eco y la reverb dan forma a la nube.'],
 ['Touch the surface to play. Hold a SNAP pad to store the current sound, tap it to recall.',
  'Касайся поверхности, чтобы играть. Удержи пэд СНИМОК, чтобы сохранить текущий звук, тапни — чтобы вызвать.',
  'Toca la superficie para tocar. Mantén un pad ESCENA para guardar el sonido actual y tócalo para recuperarlo.'],
 ['Load an audio file or record your own. Sustained sounds and short loops work best.',
  'Загрузи аудиофайл или запиши свой звук. Лучше всего подходят протяжные звуки и короткие лупы.',
  'Carga un archivo de audio o graba el tuyo. Los sonidos sostenidos y los bucles cortos funcionan mejor.'],
 ["Undo", "Отмена", "Deshacer"],
 ["Redo", "Повтор", "Rehacer"],
 ["Mod", "Мод", "Mod"],
 ["Seq", "Секв", "Sec"],
 ["■ LOOP", "■ ПЕТЛЯ", "■ BUCLE"],
 ["▶ LOOP", "▶ ПЕТЛЯ", "▶ BUCLE"],
 ["Edit", "Правка", "Editar"],
 ["Export", "Экспорт", "Exportar"],
 ["Gesture", "Жест", "Gesto"],
 ["Target", "Цель", "Destino"],
 ["Scale", "Строй", "Escala"],
 ["Root", "Тоника", "Tónica"],
 ["Tempo", "Темп", "Tempo"],
 ["Rate", "Скорость", "Velocidad"],
 ["Arpeggiator", "Арпеджиатор", "Arpegiador"],
 ["Sequencer", "Секвенсор", "Secuenciador"],
 ["Mode", "Режим", "Modo"],
 ["Octaves", "Октавы", "Octavas"],
 ["Length", "Длина", "Longitud"],
 ["Grab last", "Захват", "Capturar"],
 ["Demo sounds", "Демо-звуки", "Sonidos demo"],
 ["Gate", "Гейт", "Gate"],
 ["Sin", "Син", "Sin"],
 ["Tri", "Треуг", "Tri"],
 ["Sqr", "Квадр", "Cuad"],
 ["Saw", "Пила", "Sierra"],
 ["S&H", "S&H", "S&H"],
 ["Pos", "Поз", "Pos"],
 ["Dens", "Плотн", "Dens"],
 ["Cut", "Срез", "Corte"],
 ["Rev", "Реверс", "Inv"],
 ["Chrom", "Хром", "Crom"],
 ["Major", "Мажор", "Mayor"],
 ["Minor", "Минор", "Menor"],
 ["Dorian", "Дорийский", "Dórico"],
 ["Pent", "Пента", "Penta"],
 ["Min pent", "Мин. пента", "Penta men."],
 ["Whole", "Целотон.", "Tonos"],
 ["Blues", "Блюз", "Blues"],
 ["Arp off", "АРП ВЫКЛ", "ARP NO"],
 ["Arp on", "АРП ВКЛ", "ARP SÍ"],
 ["Seq off", "СЕКВ ВЫКЛ", "SEC NO"],
 ["Seq on", "СЕКВ ВКЛ", "SEC SÍ"],
 ["Up", "Вверх", "Arriba"],
 ["Down", "Вниз", "Abajo"],
 ["Up-dn", "Вв-вн", "Ar-ab"],
 ["Rand", "Случ.", "Alea"],
 ["Order", "Порядок", "Orden"],
 ["Clear", "Сброс", "Borrar"],
 ["Armed", "Жду", "Listo"],
 ["No gesture", "Нет жеста", "Sin gesto"],
 ["Preview", "Прослушать", "Escuchar"],
 ["Crop", "Обрезать", "Recortar"],
 ["Remove", "Удалить", "Quitar"],
 ["Trim sil.", "Тишина", "Silencio"],
 ["Full", "Всё", "Todo"],
 ["Normalize", "Нормализ.", "Normalizar"],
 ["Fade in", "Нараст.", "Entrada"],
 ["Fade out", "Затух.", "Salida"],
 ["Snap", "Привязка", "Imán"],
 ["Cropped", "Обрезано", "Recortado"],
 ["Removed", "Удалено", "Quitado"],
 ["Silence trimmed", "Тишина убрана", "Silencio recortado"],
 ["Normalized", "Нормализовано", "Normalizado"],
 ["Reversed", "Развёрнуто", "Invertido"],
 ["Faded", "Фейд добавлен", "Fundido aplicado"],
 ["Nothing to crop", "Нечего обрезать", "Nada que recortar"],
 ["Nothing to trim", "Нечего убирать", "Nada que quitar"],
 ["Select a smaller region to cut", "Выбери область поменьше", "Elige una región más pequeña"],
 ["Drag the handles: loop region", "Тяни ручки: область лупа", "Arrastra los tiradores: región de bucle"],
 ["swipe: select", "свайп: выделить", "deslizar: seleccionar"],
 ["pinch: zoom", "щипок: зум", "pellizcar: zoom"],
 ["double-tap: reset zoom", "двойной тап: сброс зума", "doble toque: restablecer zoom"],
 ["● REC OUT", "● ЗАП. ВЫХОДА", "● GRAB. SALIDA"],
 ["Save wav", "Сохр. WAV", "Guardar WAV"],
 ["REC OUT records everything you hear and saves it as a 16-bit stereo WAV. SAVE WAV writes the current sample.", "ЗАП. ВЫХОДА пишет всё, что ты слышишь, и сохраняет 16-битный стерео WAV. СОХР. WAV сохраняет текущий сэмпл.", "GRAB. SALIDA graba todo lo que oyes y lo guarda como WAV estéreo de 16 bits. GUARDAR WAV guarda la muestra actual."],
 ["Enable MIDI", "Включить MIDI", "Activar MIDI"],
 ["Learn", "Назначить", "Asignar"],
 ["Notes, pitch bend and sustain pedal play the sampler. Tap LEARN, touch a knob, then move a controller to map it.", "Ноты, питч-бенд и педаль сустейна играют сэмплером. Нажми НАЗНАЧИТЬ, коснись ручки и подвигай контроллер, чтобы привязать его.", "Las notas, el pitch bend y el pedal de sustain tocan el sampler. Toca ASIGNAR, toca una perilla y mueve un controlador para asignarlo."],
 ["No MIDI inputs found", "MIDI-входы не найдены", "No se encontraron entradas MIDI"],
 ["Web MIDI is not supported in this browser", "Web MIDI не поддерживается в этом браузере", "Este navegador no admite Web MIDI"],
 ["MIDI access was denied", "Доступ к MIDI запрещён", "Acceso MIDI denegado"],
 ["Touch a knob, then move a controller", "Коснись ручки, затем подвигай контроллер", "Toca una perilla y mueve un controlador"],
 ["Move a MIDI controller", "Подвигай MIDI-контроллер", "Mueve un controlador MIDI"],
 ["MIDI learn off", "Назначение MIDI выключено", "Asignación MIDI desactivada"],
 ["Nothing recorded", "Ничего не записано", "Nada grabado"],
 ["Start the audio first", "Сначала запусти звук", "Inicia el audio primero"],
 ["Recording the output…", "Пишу выход…", "Grabando la salida…"],
 ["Generating…", "Генерирую…", "Generando…"],
 ["Frozen: position locked", "Заморожено: позиция зафиксирована", "Congelado: posición fija"],
 ["Unfrozen", "Разморожено", "Descongelado"],
 ["Record a gesture first", "Сначала запиши жест", "Graba un gesto primero"],
 ["Rec", "Запись", "Grab."],
 ["Pad", "Пэд", "Pad"],
 ["Glass", "Стекло", "Vidrio"],
 ["Choir", "Хор", "Coro"],
 ["Wind", "Ветер", "Viento"],
 ["Pluck", "Щипок", "Punteo"],
 ["Drift", "Дрейф", "Deriva"],
 ["Wobble", "Качание", "Vaivén"],
 ["Swarm", "Рой", "Enjambre"],
 ["Depth 0 switches an LFO off. The LFOs move the grain settings around the values of the knobs, so the cloud keeps changing by itself.", "Глубина 0 выключает LFO. LFO двигают настройки зёрен вокруг значений ручек, так что облако меняется само.", "Con profundidad 0 el LFO queda apagado. Los LFO mueven los ajustes de los granos alrededor de los valores de las perillas, así la nube cambia sola."],
 ["Keys, MIDI and Y: PITCH follow the scale", "Клавиши, MIDI и Y: ВЫСОТА следуют строю", "Las teclas, MIDI e Y: ALTURA siguen la escala"],
 ["Shared by the arpeggiator and the sequencer", "Общий для арпеджиатора и секвенсора", "Compartido por el arpegiador y el secuenciador"],
 ["Hold keys to arpeggiate them", "Держи клавиши, чтобы арпеджировать их", "Mantén teclas para arpegiarlas"],
 ["Tap a step to switch it", "тап по шагу включает его", "toca un paso para activarlo"],
 ["drag in the grid to set its note", "тяни по сетке, чтобы задать ноту", "arrastra en la rejilla para fijar su nota"],
 ["keys transpose", "клавиши транспонируют", "las teclas transponen"],
 ["Load any audio file or record from the microphone. GRAB turns the last seconds of what you hear into a new sample. Short loops and sustained sounds make the best clouds.", "Загрузи любой аудиофайл или запиши звук с микрофона. ЗАХВАТ превращает последние секунды того, что ты слышишь, в новый сэмпл. Лучше всего облака получаются из коротких лупов и протяжных звуков.", "Carga cualquier archivo de audio o graba con el micrófono. CAPTURAR convierte los últimos segundos de lo que oyes en una muestra nueva. Los bucles cortos y los sonidos sostenidos dan las mejores nubes."],
 ["Modulation", "Модуляция", "Modulación"],
 ["Edit sample", "Правка сэмпла", "Editar muestra"],
 ["Arp and sequencer", "Арп и секвенсор", "Arp y secuenciador"],
 ["Tap the keys to play pitches, hold several for a chord cloud. HOLD keeps the cloud going by itself, FREEZE also locks the position, OCT shifts the octave and RND randomises the grain settings. The arrows at the top undo and redo.", "Нажимай клавиши, чтобы менять высоту, зажми несколько — получится аккордовое облако. ДЕРЖАТЬ оставляет облако звучать само, ЗАМОРОЗКА ещё и фиксирует позицию, ОКТ сдвигает октаву, СЛУЧ случайно меняет настройки зёрен. Стрелки сверху — отмена и повтор.", "Toca las teclas para tocar notas y mantén varias para una nube de acordes. MANTENER deja la nube sonando sola, CONGELADO además fija la posición, OCT cambia la octava y ALEA aleatoriza los ajustes de los granos. Las flechas de arriba deshacen y rehacen."],
 ["GRAIN shapes the cloud. TONE adds scan, filter, envelope, echo and reverb. MOD has two LFOs. PLAY is a big touch surface with snapshots and gesture loops. SEQ has the scale, arpeggiator and sequencer. SAMPLE loads, records, edits and exports sound and holds the settings.", "ЗЕРНО формирует облако. ТОН добавляет скан, фильтр, огибающую, эхо и реверб. МОД — два LFO. ИГРА — большая сенсорная поверхность со снимками и петлями жестов. СЕКВ — строй, арпеджиатор и секвенсор. СЭМПЛ загружает, записывает, правит и экспортирует звук, здесь же настройки.", "GRANO da forma a la nube. TONO añade barrido, filtro, envolvente, eco y reverb. MOD tiene dos LFO. TOCAR es una gran superficie táctil con escenas y bucles de gestos. SEC tiene la escala, el arpegiador y el secuenciador. MUESTRA carga, graba, edita y exporta sonido y reúne los ajustes."],
 ["Two LFOs move the grain settings by themselves. Pick a shape and a target, then raise DEPTH. RATE sets how fast it moves.", "Два LFO сами двигают настройки зёрен. Выбери форму и цель, затем подними ГЛУБИНУ. СКОРОСТЬ задаёт, как быстро это движется.", "Dos LFO mueven los ajustes de los granos por sí solos. Elige una forma y un destino y sube la PROFUNDIDAD. VELOCIDAD marca lo rápido que se mueve."],
 ["REC arms the recorder: touch the surface, move around, then tap STOP. LOOP replays your movement, so your hands are free for the knobs.", "ЗАПИСЬ включает рекордер: коснись поверхности, подвигай пальцем и нажми СТОП. ПЕТЛЯ повторяет твоё движение, а руки свободны для ручек.", "GRABAR arma el grabador: toca la superficie, muévete y pulsa PARAR. BUCLE repite tu movimiento y tus manos quedan libres para las perillas."],
 ["Pick a root and a scale: the keys, MIDI and Y: PITCH snap to it, so every cloud stays in tune.", "Выбери тонику и строй: клавиши, MIDI и Y: ВЫСОТА подстроятся под него, и любое облако останется в строю.", "Elige una tónica y una escala: las teclas, MIDI e Y: ALTURA se ajustan a ella y toda nube suena afinada."],
 ["Hold keys with ARP on to arpeggiate them, or start SEQ: tap a step to switch it, drag in the grid to set its note. Keys transpose the pattern. TEMPO and RATE are shared.", "Держи клавиши при включённом АРП, чтобы арпеджировать их, или запусти СЕКВ: тапай шаги, тяни по сетке, чтобы задать ноту. Клавиши транспонируют паттерн. ТЕМП и СКОРОСТЬ общие.", "Mantén teclas con ARP activado para arpegiarlas, o inicia SEC: toca un paso para activarlo y arrastra en la rejilla para fijar su nota. Las teclas transponen el patrón. TEMPO y VELOCIDAD son comunes."],
 ["The loop region is where the grains are read from. Drag its two handles, swipe on empty space to select a region, pinch to zoom, double-tap to reset the zoom. CROP, REMOVE and the other tools change the sample itself, and the arrows at the top undo them.", "Область лупа — это место, откуда читаются зёрна. Тяни две ручки, свайпай по пустому месту, чтобы выделить область, щипком меняй масштаб, двойной тап сбрасывает зум. ОБРЕЗАТЬ, УДАЛИТЬ и другие инструменты меняют сам сэмпл, а стрелки сверху их отменяют.", "La región de bucle es de donde se leen los granos. Arrastra sus dos tiradores, desliza sobre el espacio vacío para seleccionar una región, pellizca para hacer zoom y toca dos veces para restablecerlo. RECORTAR, QUITAR y las demás herramientas cambian la propia muestra, y las flechas de arriba las deshacen."],
 ["LOAD brings in any audio file, REC records from the microphone. GRAB keeps the last seconds of what you hear and turns them into a new sample.", "ФАЙЛ загружает любой аудиофайл, ЗАПИСЬ пишет с микрофона. ЗАХВАТ сохраняет последние секунды того, что ты слышишь, как новый сэмпл.", "ABRIR carga cualquier archivo de audio y GRABAR graba con el micrófono. CAPTURAR guarda los últimos segundos de lo que oyes como una muestra nueva."],
 ["Raise DEPTH to wake an LFO up. Slow rates make the cloud breathe, fast ones make it flutter.", "Подними ГЛУБИНУ, чтобы оживить LFO. Медленные скорости заставляют облако дышать, быстрые — трепетать.", "Sube la PROFUNDIDAD para despertar un LFO. Las velocidades lentas hacen respirar la nube y las rápidas la hacen vibrar."],
 ["Touch the surface to play. REC records a gesture you can loop. Hold a SNAP pad to store the current sound, tap it to recall.", "Касайся поверхности, чтобы играть. ЗАПИСЬ пишет жест, который можно зациклить. Удержи пэд СНИМОК, чтобы сохранить текущий звук, тапни — чтобы вызвать.", "Toca la superficie para tocar. GRABAR graba un gesto que puedes repetir en bucle. Mantén un pad ESCENA para guardar el sonido actual y tócalo para recuperarlo."],
 ["Pick a scale to keep everything in tune. Hold keys with ARP on, or start SEQ. Keys transpose the sequence.", "Выбери строй, чтобы всё звучало чисто. Держи клавиши при включённом АРП или запусти СЕКВ. Клавиши транспонируют последовательность.", "Elige una escala para que todo suene afinado. Mantén teclas con ARP activado o inicia SEC. Las teclas transponen la secuencia."],
 ["Load an audio file, record your own or generate a demo. Drag the handles on the waveform to choose the loop region.", "Загрузи аудиофайл, запиши свой звук или создай демо. Тяни ручки на волне, чтобы выбрать область лупа.", "Carga un archivo de audio, graba el tuyo o genera una demo. Arrastra los tiradores de la onda para elegir la región de bucle."]
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
var I18N={ru:{},es:{}},I18N_LC={ru:{},es:{}},curLang='en',i18nRec=new WeakMap(),i18nObs=null;
TR.forEach(function(r){I18N.ru[r[0]]=r[1];I18N.es[r[0]]=r[2]});
['ru','es'].forEach(function(l){for(var k in I18N[l])I18N_LC[l][k.toLowerCase()]=I18N[l][k]});
function detectLang(){var l=(navigator.language||'en').slice(0,2).toLowerCase();return l==='ru'||l==='es'?l:'en'}
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
  curLang=code==='auto'?detectLang():code;
  if(curLang!=='ru'&&curLang!=='es')curLang='en';
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

