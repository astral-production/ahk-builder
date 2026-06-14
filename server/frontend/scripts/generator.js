// ============================================
// AHK Builder - Code Generator
// Converts Blockly blocks into AutoHotkey v1 or v2 code
// ============================================

// Current AHK version target ('v1' or 'v2')
let AHK_VERSION = 'v1';

// Create the AHK generator
Blockly.Ahk = new Blockly.Generator('AHK');

// Order precedence constants for value-to-code generation
Blockly.Ahk.ORDER_ATOMIC = 0;    // literal values
Blockly.Ahk.ORDER_NONE = 99;     // no wrapping needed
Blockly.Ahk.ORDER_COMMA = 10;    // comma-separated
Blockly.Ahk.ORDER_UNARY = 20;    // unary operators
Blockly.Ahk.ORDER_MULTIPLICATIVE = 30;
Blockly.Ahk.ORDER_ADDITIVE = 40;
Blockly.Ahk.ORDER_RELATIONAL = 50;
Blockly.Ahk.ORDER_LOGICAL = 70;
Blockly.Ahk.ORDER_ASSIGNMENT = 90;

// Set indent to empty since we handle indentation manually in generators
Blockly.Ahk.INDENT = '';

// Disable statement prefix/suffix (default is fine)
// Helper: wrap string in quotes for v2 function syntax
function q(s) {
  if (AHK_VERSION === 'v2') return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

// Helper: format a command for v1 (command syntax) or v2 (function syntax)
function cmd(name, params) {
  if (AHK_VERSION === 'v2') {
    // v2 function syntax: Name(param1, param2, ...)
    return name + '(' + params.join(', ') + ')\n';
  }
  // v1 command syntax: Name, param1, param2, ...
  return name + ', ' + params.join(', ') + '\n';
}

// ============================================
// MOUSE GENERATORS
// ============================================

Blockly.Ahk['ahk_mouse_click'] = function (block) {
  const button = block.getFieldValue('BUTTON');
  const x = block.getFieldValue('X');
  const y = block.getFieldValue('Y');
  const count = block.getFieldValue('COUNT');
  if (AHK_VERSION === 'v2') {
    // v2: Click syntax: Click(), Click(x,y), Click("Right"), Click(x,y,"Right"), Click(2) for double
    if (button === 'LD') return `Click(${x}, ${y}, 2)\n`;
    if (button === 'RD') return `Click(${x}, ${y}, "Right", 2)\n`;
    if (button === 'MD') return `Click(${x}, ${y}, "Middle", 2)\n`;
    const btnMap = { 'L': '', 'R': '"Right"', 'M': '"Middle"' };
    if (x === 0 && y === 0 && btnMap[button]) return `Click(${btnMap[button]})\n`;
    if (x === 0 && y === 0) return `Click()\n`;
    if (btnMap[button]) return `Click(${x}, ${y}, ${btnMap[button]})\n`;
    return `Click(${x}, ${y})\n`;
  }
  return `MouseClick, ${button}, ${x}, ${y}, ${count}\n`;
};

Blockly.Ahk['ahk_mouse_move'] = function (block) {
  const x = block.getFieldValue('X');
  const y = block.getFieldValue('Y');
  const speed = block.getFieldValue('SPEED');
  if (AHK_VERSION === 'v2') {
    return cmd('MouseMove', [x, y, speed]);
  }
  return `MouseMove, ${x}, ${y}, ${speed}\n`;
};

Blockly.Ahk['ahk_mouse_drag'] = function (block) {
  const button = block.getFieldValue('BUTTON');
  const x1 = block.getFieldValue('X1');
  const y1 = block.getFieldValue('Y1');
  const x2 = block.getFieldValue('X2');
  const y2 = block.getFieldValue('Y2');
  if (AHK_VERSION === 'v2') {
    return cmd('MouseClickDrag', [q(button), x1, y1, x2, y2]);
  }
  return `MouseClickDrag, ${button}, ${x1}, ${y1}, ${x2}, ${y2}\n`;
};

Blockly.Ahk['ahk_mouse_wheel'] = function (block) {
  const dir = block.getFieldValue('DIRECTION');
  const count = block.getFieldValue('COUNT');
  if (AHK_VERSION === 'v2') {
    // v2: Send "{WheelDown 5}" or Click "WheelDown"
    return `Send("{${dir} ${count}}")\n`;
  }
  return `MouseClick, Wheel${dir}, , , ${count}\n`;
};

Blockly.Ahk['ahk_mouse_get_pos'] = function (block) {
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    // v2: MouseGetPos uses ByRef parameters with &
    return cmd('MouseGetPos', ['&' + v + 'X', '&' + v + 'Y']);
  }
  return `MouseGetPos, ${v}X, ${v}Y\n`;
};

// ============================================
// KEYBOARD GENERATORS
// ============================================

Blockly.Ahk['ahk_send'] = function (block) {
  const keys = block.getFieldValue('KEYS');
  if (AHK_VERSION === 'v2') {
    return cmd('Send', [q(keys)]);
  }
  return `Send, ${keys}\n`;
};

Blockly.Ahk['ahk_send_input'] = function (block) {
  const keys = block.getFieldValue('KEYS');
  if (AHK_VERSION === 'v2') {
    return cmd('SendInput', [q(keys)]);
  }
  return `SendInput, ${keys}\n`;
};

Blockly.Ahk['ahk_type_text'] = function (block) {
  const text = block.getFieldValue('TEXT');
  if (AHK_VERSION === 'v2') {
    return cmd('SendText', [q(text)]);
  }
  return `Send, ${text}\n`;
};

Blockly.Ahk['ahk_hotkey'] = function (block) {
  const hotkey = block.getFieldValue('HOTKEY');
  const actions = Blockly.Ahk.statementToCode(block, 'ACTIONS');
  const indented = actions.split('\n').map(l => l ? '    ' + l : l).join('\n');
  if (AHK_VERSION === 'v2') {
    // v2: hotkey definitions use { } blocks with return
    return `${hotkey}:: {\n${indented}    return\n}\n`;
  }
  return `${hotkey}::\n${indented}return\n`;
};

Blockly.Ahk['ahk_key_wait'] = function (block) {
  const key = block.getFieldValue('KEY');
  if (AHK_VERSION === 'v2') {
    return cmd('KeyWait', [q(key)]);
  }
  return `KeyWait, ${key}\n`;
};

// ============================================
// WINDOW GENERATORS
// ============================================

function makeWinGen(command) {
  return function (block) {
    const title = block.getFieldValue('TITLE');
    if (AHK_VERSION === 'v2') {
      return cmd(command, [q(title)]);
    }
    return `${command}, ${title}\n`;
  };
}

Blockly.Ahk['ahk_win_activate'] = makeWinGen('WinActivate');
Blockly.Ahk['ahk_win_close'] = makeWinGen('WinClose');
Blockly.Ahk['ahk_win_minimize'] = makeWinGen('WinMinimize');
Blockly.Ahk['ahk_win_maximize'] = makeWinGen('WinMaximize');

Blockly.Ahk['ahk_win_move'] = function (block) {
  const title = block.getFieldValue('TITLE');
  const x = block.getFieldValue('X');
  const y = block.getFieldValue('Y');
  const w = block.getFieldValue('W');
  const h = block.getFieldValue('H');
  if (AHK_VERSION === 'v2') {
    return cmd('WinMove', [q(title), '', x, y, w, h]);
  }
  return `WinMove, ${title}, , ${x}, ${y}, ${w}, ${h}\n`;
};

Blockly.Ahk['ahk_win_wait'] = function (block) {
  const title = block.getFieldValue('TITLE');
  const timeout = block.getFieldValue('TIMEOUT');
  if (AHK_VERSION === 'v2') {
    return cmd('WinWait', [q(title), '', timeout]);
  }
  return `WinWait, ${title}, , ${timeout}\n`;
};

Blockly.Ahk['ahk_win_wait_active'] = function (block) {
  const title = block.getFieldValue('TITLE');
  const timeout = block.getFieldValue('TIMEOUT');
  if (AHK_VERSION === 'v2') {
    return cmd('WinWaitActive', [q(title), '', timeout]);
  }
  return `WinWaitActive, ${title}, , ${timeout}\n`;
};

Blockly.Ahk['ahk_win_get_active_title'] = function (block) {
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    // v2: function returns the title
    return `${v} := WinGetTitle("A")\n`;
  }
  return `WinGetActiveTitle, ${v}\n`;
};

// ============================================
// CONTROL FLOW GENERATORS
// ============================================

Blockly.Ahk['ahk_loop'] = function (block) {
  const count = block.getFieldValue('COUNT');
  const actions = Blockly.Ahk.statementToCode(block, 'ACTIONS');
  const indented = actions.split('\n').map(l => l ? '    ' + l : l).join('\n');
  if (AHK_VERSION === 'v2') {
    return `Loop ${count} {\n${indented}\n}\n`;
  }
  return `Loop, ${count}\n${indented}\n`;
};

Blockly.Ahk['ahk_while'] = function (block) {
  const condition = block.getFieldValue('CONDITION');
  const actions = Blockly.Ahk.statementToCode(block, 'ACTIONS');
  const indented = actions.split('\n').map(l => l ? '    ' + l : l).join('\n');
  if (AHK_VERSION === 'v2') {
    return `While (${condition}) {\n${indented}\n}\n`;
  }
  return `While (${condition})\n${indented}\n`;
};

Blockly.Ahk['ahk_sleep'] = function (block) {
  const ms = block.getFieldValue('MS');
  if (AHK_VERSION === 'v2') {
    return cmd('Sleep', [ms]);
  }
  return `Sleep, ${ms}\n`;
};

Blockly.Ahk['ahk_run'] = function (block) {
  const target = block.getFieldValue('TARGET');
  if (AHK_VERSION === 'v2') {
    return cmd('Run', [q(target)]);
  }
  return `Run, ${target}\n`;
};

Blockly.Ahk['ahk_run_wait'] = function (block) {
  const target = block.getFieldValue('TARGET');
  if (AHK_VERSION === 'v2') {
    return cmd('RunWait', [q(target)]);
  }
  return `RunWait, ${target}\n`;
};

Blockly.Ahk['ahk_wait_pixel'] = function (block) {
  const color = block.getFieldValue('COLOR');
  const x = block.getFieldValue('X');
  const y = block.getFieldValue('Y');
  const timeout = block.getFieldValue('TIMEOUT');
  const hex = color.replace('#', '');
  const r = hex.substring(0, 2);
  const g = hex.substring(2, 4);
  const b = hex.substring(4, 6);
  const ahkColor = b + g + r;
  const timeoutMs = timeout * 1000;

  if (AHK_VERSION === 'v2') {
    return [
      `; Wait for pixel color ${color} at (${x}, ${y})`,
      `StartTime := A_TickCount`,
      `Loop {`,
      `    PixelGetColor pixelColor, ${x}, ${y}`,
      `    if (pixelColor = "${ahkColor}")`,
      `        break`,
      `    if (A_TickCount - StartTime > ${timeoutMs})`,
      `        break`,
      `    Sleep(50)`,
      `}\n`,
    ].join('\n');
  }
  return [
    `; Wait for pixel color ${color} at (${x}, ${y})`,
    `StartTime := A_TickCount`,
    `Loop {`,
    `    PixelGetColor, pixelColor, ${x}, ${y}`,
    `    if (pixelColor = ${ahkColor})`,
    `        break`,
    `    if (A_TickCount - StartTime > ${timeoutMs})`,
    `        break`,
    `    Sleep, 50`,
    `}\n`,
  ].join('\n');
};

// ============================================
// VARIABLES GENERATORS
// ============================================

Blockly.Ahk['ahk_set_variable'] = function (block) {
  const v = block.getFieldValue('VAR');
  const val = block.getFieldValue('VALUE');
  if (AHK_VERSION === 'v2') {
    // In v2, string values need quotes, numbers don't
    const fval = isNaN(parseFloat(val)) ? q(val) : val;
    return `${v} := ${fval}\n`;
  }
  return `${v} := ${val}\n`;
};

Blockly.Ahk['ahk_get_variable'] = function (block) {
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    // v2: variables are just the name, no % wrapping
    return [v, Blockly.Ahk.ORDER_ATOMIC];
  }
  return [`%${v}%`, Blockly.Ahk.ORDER_ATOMIC];
};

Blockly.Ahk['ahk_math_expression'] = function (block) {
  const v = block.getFieldValue('VAR');
  const a = block.getFieldValue('A');
  const op = block.getFieldValue('OP');
  const b = block.getFieldValue('B');
  return `${v} := ${a} ${op} ${b}\n`;
};

Blockly.Ahk['ahk_string_concat'] = function (block) {
  const v = block.getFieldValue('VAR');
  const a = block.getFieldValue('A');
  const b = block.getFieldValue('B');
  if (AHK_VERSION === 'v2') {
    // v2: string concatenation uses just spaces or .
    return `${v} := "${a}" "${b}"\n`;
  }
  return `${v} := "${a}" . "${b}"\n`;
};

Blockly.Ahk['ahk_clipboard'] = function (block) {
  const action = block.getFieldValue('ACTION');
  const clipboardVar = AHK_VERSION === 'v2' ? 'A_Clipboard' : 'Clipboard';

  if (action === 'set') {
    const value = Blockly.Ahk.valueToCode(block, 'VALUE', Blockly.Ahk.ORDER_NONE) || '""';
    return `${clipboardVar} := ${value}\n`;
  } else if (action === 'get') {
    const varName = block.getFieldValue('VAR') || 'ClipContent';
    return `${varName} := ${clipboardVar}\n`;
  } else {
    return `${clipboardVar} :=\n`;
  }
};

// ============================================
// DIALOG GENERATORS
// ============================================

Blockly.Ahk['ahk_msgbox'] = function (block) {
  const text = block.getFieldValue('TEXT');
  const type = block.getFieldValue('TYPE');
  const title = block.getFieldValue('TITLE');
  if (AHK_VERSION === 'v2') {
    // v2: MsgBox(text, title, type)
    // Options in v2: "OK", "OKCancel", "AbortRetryIgnore", "YesNoCancel", "YesNo", "RetryCancel"
    const typeMap = { '0': '', '1': '"OKCancel"', '2': '"AbortRetryIgnore"', '3': '"YesNoCancel"', '4': '"YesNo"', '5': '"RetryCancel"' };
    const opt = typeMap[type] || '';
    if (opt && title) return `MsgBox(${q(text)}, ${q(title)}, ${opt})\n`;
    if (title) return `MsgBox(${q(text)}, ${q(title)})\n`;
    return `MsgBox(${q(text)})\n`;
  }
  if (type === '0') {
    return `MsgBox, ${text}\n`;
  }
  return `MsgBox, ${type}, ${title}, ${text}\n`;
};

Blockly.Ahk['ahk_inputbox'] = function (block) {
  const prompt = block.getFieldValue('PROMPT');
  const title = block.getFieldValue('TITLE');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    // v2: InputBox returns an object, use .Value
    return `${v} := InputBox(${q(prompt)}, ${q(title)}).Value\n`;
  }
  return `InputBox, ${v}, ${title}, ${prompt}\n`;
};

Blockly.Ahk['ahk_tooltip'] = function (block) {
  const text = block.getFieldValue('TEXT');
  const x = block.getFieldValue('X');
  const y = block.getFieldValue('Y');
  if (AHK_VERSION === 'v2') {
    return cmd('ToolTip', [q(text), x, y]);
  }
  return `ToolTip, ${text}, ${x}, ${y}\n`;
};

Blockly.Ahk['ahk_splash_text'] = function (block) {
  const text = block.getFieldValue('TEXT');
  const sec = block.getFieldValue('SECONDS');
  if (AHK_VERSION === 'v2') {
    // v2: SplashTextOn removed. Use a simple GUI or just a ToolTip
    return [
      `; SplashText removed in AHK v2 — using ToolTip as replacement`,
      `ToolTip(${q(text)}, 0, 0)`,
      `Sleep(${sec * 1000})`,
      `ToolTip()\n`,
    ].join('\n');
  }
  return `SplashTextOn, , , ${text}\nSleep, ${sec * 1000}\nSplashTextOff\n`;
};

// ============================================
// FILE GENERATORS
// ============================================

Blockly.Ahk['ahk_file_append'] = function (block) {
  const path = block.getFieldValue('FILEPATH');
  const text = block.getFieldValue('TEXT');
  if (AHK_VERSION === 'v2') {
    return cmd('FileAppend', [q(text), q(path)]);
  }
  return `FileAppend, ${text}, ${path}\n`;
};

Blockly.Ahk['ahk_file_read'] = function (block) {
  const path = block.getFieldValue('FILEPATH');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    // v2: FileRead returns content directly
    return `${v} := FileRead(${q(path)})\n`;
  }
  return `FileRead, ${v}, ${path}\n`;
};

Blockly.Ahk['ahk_file_delete'] = function (block) {
  const path = block.getFieldValue('FILEPATH');
  if (AHK_VERSION === 'v2') {
    return cmd('FileDelete', [q(path)]);
  }
  return `FileDelete, ${path}\n`;
};

Blockly.Ahk['ahk_file_copy'] = function (block) {
  const src = block.getFieldValue('SOURCE');
  const dst = block.getFieldValue('DEST');
  if (AHK_VERSION === 'v2') {
    return cmd('FileCopy', [q(src), q(dst)]);
  }
  return `FileCopy, ${src}, ${dst}\n`;
};

// ============================================
// ACTIONS GENERATORS
// ============================================

Blockly.Ahk['ahk_comment'] = function (block) {
  const text = block.getFieldValue('TEXT');
  return `; ${text}\n`;
};

Blockly.Ahk['ahk_msgbox_info'] = function (block) {
  const text = block.getFieldValue('TEXT');
  if (AHK_VERSION === 'v2') {
    return `MsgBox(${q(text)}, "AHK Builder", "OK")\n`;
  }
  return `MsgBox, 64, AHK Builder, ${text}\n`;
};

Blockly.Ahk['ahk_exit'] = function (block) {
  if (AHK_VERSION === 'v2') {
    return `ExitApp()\n`;
  }
  return `ExitApp\n`;
};

Blockly.Ahk['ahk_reload'] = function (block) {
  if (AHK_VERSION === 'v2') {
    return `Reload()\n`;
  }
  return `Reload\n`;
};

Blockly.Ahk['ahk_send_email'] = function (block) {
  const to = block.getFieldValue('TO');
  const subject = block.getFieldValue('SUBJECT');
  const body = block.getFieldValue('BODY');
  const note = '; Email requires CDO.Message COM object configuration\n';
  if (AHK_VERSION === 'v2') {
    return `${note}MailSend(${q(to)}, ${q(subject)}, ${q(body)})\n`;
  }
  return `${note}MailSend, ${to}, ${subject}, ${body}\n`;
};

// ============================================
// BUILT-IN BLOCK GENERATORS
// ============================================

Blockly.Ahk['controls_if'] = function (block) {
  let code = '';
  for (let i = 0; i < block.elseifCount_ + 1; i++) {
    const condition = Blockly.Ahk.valueToCode(block, 'IF' + i, Blockly.Ahk.ORDER_NONE) || 'true';
    const actions = Blockly.Ahk.statementToCode(block, 'DO' + i);
    const indented = actions.split('\n').map(l => l ? '    ' + l : l).join('\n');
    if (i === 0) {
      code += `If (${condition})\n    {\n${indented}    }\n`;
    } else {
      code += `Else If (${condition})\n    {\n${indented}    }\n`;
    }
  }
  if (block.elseCount_) {
    const actions = Blockly.Ahk.statementToCode(block, 'ELSE');
    const indented = actions.split('\n').map(l => l ? '    ' + l : l).join('\n');
    code += `Else\n    {\n${indented}    }\n`;
  }
  return code;
};

// ============================================
// NEW: IMAGE SEARCH GENERATORS
// ============================================

Blockly.Ahk['ahk_image_search'] = function (block) {
  const img = block.getFieldValue('IMAGE');
  const x1 = block.getFieldValue('X1');
  const y1 = block.getFieldValue('Y1');
  const x2 = block.getFieldValue('X2');
  const y2 = block.getFieldValue('Y2');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    return [
      `; ImageSearch - searches for ${img}`,
      `FoundX := 0, FoundY := 0`,
      `try ImageSearch(&FoundX, &FoundY, ${x1}, ${y1}, ${x2}, ${y2}, ${q(img)})`,
      `${v}X := FoundX`,
      `${v}Y := FoundY\n`,
    ].join('\n');
  }
  return `ImageSearch, ${v}X, ${v}Y, ${x1}, ${y1}, ${x2}, ${y2}, ${img}\n`;
};

Blockly.Ahk['ahk_pixel_search'] = function (block) {
  const color = block.getFieldValue('COLOR');
  const x1 = block.getFieldValue('X1');
  const y1 = block.getFieldValue('Y1');
  const x2 = block.getFieldValue('X2');
  const y2 = block.getFieldValue('Y2');
  const variation = block.getFieldValue('VARIATION');
  const hex = color.replace('#', '');
  const r = hex.substring(4, 6);
  const g = hex.substring(2, 4);
  const b = hex.substring(0, 2);
  const ahkColor = r + g + b;
  if (AHK_VERSION === 'v2') {
    return [
      `; PixelSearch - search for color ${color}`,
      `PixelX := 0, PixelY := 0`,
      `try PixelSearch(&PixelX, &PixelY, ${x1}, ${y1}, ${x2}, ${y2}, "${ahkColor}", ${variation})`,
      `; Check PixelX > 0 to see if found\n`,
    ].join('\n');
  }
  return `PixelSearch, PixelX, PixelY, ${x1}, ${y1}, ${x2}, ${y2}, ${ahkColor}, ${variation}\n`;
};

// ============================================
// NEW: SOUND GENERATORS
// ============================================

Blockly.Ahk['ahk_sound_beep'] = function (block) {
  const freq = block.getFieldValue('FREQ');
  const duration = block.getFieldValue('DURATION');
  if (AHK_VERSION === 'v2') {
    return cmd('SoundBeep', [freq, duration]);
  }
  return `SoundBeep, ${freq}, ${duration}\n`;
};

Blockly.Ahk['ahk_sound_play'] = function (block) {
  const file = block.getFieldValue('FILE');
  const wait = block.getFieldValue('WAIT');
  const waitFlag = wait ? (AHK_VERSION === 'v2' ? '1' : '1') : '0';
  if (AHK_VERSION === 'v2') {
    return cmd('SoundPlay', [q(file), waitFlag]);
  }
  return `SoundPlay, ${file}, ${waitFlag}\n`;
};

// ============================================
// NEW: WINDOW EXTRA GENERATORS
// ============================================

Blockly.Ahk['ahk_win_exist'] = function (block) {
  const title = block.getFieldValue('TITLE');
  // Both v1 and v2 need quotes for WinExist() function syntax
  return [`WinExist("${title}")`, Blockly.Ahk.ORDER_ATOMIC];
};

Blockly.Ahk['ahk_win_get_pos'] = function (block) {
  const title = block.getFieldValue('TITLE');
  const vx = block.getFieldValue('VARX');
  const vy = block.getFieldValue('VARY');
  const vw = block.getFieldValue('VARW');
  const vh = block.getFieldValue('VARH');
  if (AHK_VERSION === 'v2') {
    return cmd('WinGetPos', [q(title), '', `&${vx}`, `&${vy}`, `&${vw}`, `&${vh}`]);
  }
  return `WinGetPos, ${vx}, ${vy}, ${vw}, ${vh}, ${title}\n`;
};

// ============================================
// NEW: CONTROL FLOW EXTRA GENERATORS
// ============================================

Blockly.Ahk['ahk_break'] = function (block) {
  return `Break\n`;
};

Blockly.Ahk['ahk_continue'] = function (block) {
  return `Continue\n`;
};

// ============================================
// NEW: VARIABLES EXTRA GENERATORS
// ============================================

Blockly.Ahk['ahk_random'] = function (block) {
  const min = block.getFieldValue('MIN');
  const max = block.getFieldValue('MAX');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    return `${v} := Random(${min}, ${max})\n`;
  }
  return `Random, ${v}, ${min}, ${max}\n`;
};

Blockly.Ahk['ahk_env_get'] = function (block) {
  const envVar = block.getFieldValue('ENVVAR');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    return `${v} := EnvGet(${q(envVar)})\n`;
  }
  return `EnvGet, ${v}, ${envVar}\n`;
};

Blockly.Ahk['ahk_env_set'] = function (block) {
  const envVar = block.getFieldValue('ENVVAR');
  const val = block.getFieldValue('VALUE');
  if (AHK_VERSION === 'v2') {
    return cmd('EnvSet', [q(envVar), q(val)]);
  }
  return `EnvSet, ${envVar}, ${val}\n`;
};

// ============================================
// NEW: ACTIONS EXTRA GENERATORS
// ============================================

Blockly.Ahk['ahk_process'] = function (block) {
  const action = block.getFieldValue('ACTION');
  const proc = block.getFieldValue('PROCESS');
  const timeout = block.getFieldValue('TIMEOUT');
  if (AHK_VERSION === 'v2') {
    if (action === 'Close') return cmd('ProcessClose', [q(proc)]);
    if (action === 'Wait') return cmd('ProcessWait', [q(proc), timeout]);
    if (action === 'WaitClose') return cmd('ProcessWaitClose', [q(proc), timeout]);
    if (action === 'Exist') return `ProcessExist(${q(proc)})\n`;
    return `; Process Priority - requires additional setup\nProcessSetPriority(${q(proc)}, 2)\n`;
  }
  return `Process, ${action}, ${proc}, ${timeout}\n`;
};

Blockly.Ahk['ahk_block_input'] = function (block) {
  const mode = block.getFieldValue('MODE');
  if (AHK_VERSION === 'v2') {
    return cmd('BlockInput', [q(mode)]);
  }
  return `BlockInput, ${mode}\n`;
};

// ============================================
// RAW CODE GENERATORS
// ============================================

Blockly.Ahk['ahk_raw_code'] = function (block) {
  const code = Blockly.Ahk.valueToCode(block, 'CODE', Blockly.Ahk.ORDER_NONE) || '';
  return code + '\n';
};

Blockly.Ahk['ahk_raw_code_multi'] = function (block) {
  const code = block.getFieldValue('CODE') || '';
  return code + '\n';
};

// ============================================
// FUNCTION CALL GENERATORS
// ============================================

Blockly.Ahk['ahk_function_call'] = function (block) {
  const func = block.getFieldValue('FUNC');
  const a1 = Blockly.Ahk.valueToCode(block, 'ARG1', Blockly.Ahk.ORDER_COMMA) || '';
  const a2 = Blockly.Ahk.valueToCode(block, 'ARG2', Blockly.Ahk.ORDER_COMMA) || '';
  const a3 = Blockly.Ahk.valueToCode(block, 'ARG3', Blockly.Ahk.ORDER_COMMA) || '';
  const args = [a1, a2, a3].filter(a => a !== '').join(', ');
  if (AHK_VERSION === 'v2') {
    return `${func}(${args})\n`;
  }
  return `${func}(${args})\n`;
};

Blockly.Ahk['ahk_function_call_expr'] = function (block) {
  const func = block.getFieldValue('FUNC');
  const a1 = Blockly.Ahk.valueToCode(block, 'ARG1', Blockly.Ahk.ORDER_COMMA) || '';
  return [`${func}(${a1})`, Blockly.Ahk.ORDER_ATOMIC];
};

// ============================================
// STRING GENERATORS
// ============================================

Blockly.Ahk['ahk_strlen'] = function (block) {
  const str = Blockly.Ahk.valueToCode(block, 'STRING', Blockly.Ahk.ORDER_NONE) || '""';
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    return `${v} := StrLen(${str})\n`;
  }
  return `${v} := StrLen(${str})\n`;
};

Blockly.Ahk['ahk_substr'] = function (block) {
  const str = Blockly.Ahk.valueToCode(block, 'STRING', Blockly.Ahk.ORDER_NONE) || '""';
  const start = block.getFieldValue('START');
  const length = block.getFieldValue('LENGTH');
  const v = block.getFieldValue('VAR');
  if (length > 0) {
    if (AHK_VERSION === 'v2') return `${v} := SubStr(${str}, ${start}, ${length})\n`;
    return `${v} := SubStr(${str}, ${start}, ${length})\n`;
  }
  if (AHK_VERSION === 'v2') return `${v} := SubStr(${str}, ${start})\n`;
  return `${v} := SubStr(${str}, ${start})\n`;
};

Blockly.Ahk['ahk_strreplace'] = function (block) {
  const str = Blockly.Ahk.valueToCode(block, 'STRING', Blockly.Ahk.ORDER_NONE) || '""';
  const search = block.getFieldValue('SEARCH');
  const replace = block.getFieldValue('REPLACE');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') return `${v} := StrReplace(${str}, ${q(search)}, ${q(replace)})\n`;
  return `${v} := StrReplace(${str}, ${search}, ${replace})\n`;
};

Blockly.Ahk['ahk_instr'] = function (block) {
  const haystack = Blockly.Ahk.valueToCode(block, 'HAYSTACK', Blockly.Ahk.ORDER_NONE) || '""';
  const needle = block.getFieldValue('NEEDLE');
  const caseSense = block.getFieldValue('CASESENSE');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    return `${v} := InStr(${haystack}, ${q(needle)}, , ${caseSense ? '1' : '0'})\n`;
  }
  return `${v} := InStr(${haystack}, ${needle}, ${caseSense ? '1' : '0'})\n`;
};

Blockly.Ahk['ahk_strcase'] = function (block) {
  const str = Blockly.Ahk.valueToCode(block, 'STRING', Blockly.Ahk.ORDER_NONE) || '""';
  const c = block.getFieldValue('CASE');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    return `${v} := Str${c}(${str})\n`;
  }
  return `${v} := Str${c}(${str})\n`;
};

Blockly.Ahk['ahk_trim'] = function (block) {
  const str = Blockly.Ahk.valueToCode(block, 'STRING', Blockly.Ahk.ORDER_NONE) || '""';
  const mode = block.getFieldValue('MODE');
  const chars = block.getFieldValue('CHARS');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    if (chars) return `${v} := ${mode}(${str}, ${q(chars)})\n`;
    return `${v} := ${mode}(${str})\n`;
  }
  if (chars) return `${v} := ${mode}(${str}, ${chars})\n`;
  return `${v} := ${mode}(${str})\n`;
};

Blockly.Ahk['ahk_format'] = function (block) {
  const fmt = block.getFieldValue('FMT');
  const val1 = block.getFieldValue('VAL1');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    return `${v} := Format(${q(fmt)}, ${q(val1)})\n`;
  }
  return `${v} := Format(${fmt}, ${val1})\n`;
};

// ============================================
// MATH GENERATORS
// ============================================

Blockly.Ahk['ahk_math_func'] = function (block) {
  const fn = block.getFieldValue('FN');
  const x = Blockly.Ahk.valueToCode(block, 'X', Blockly.Ahk.ORDER_NONE) || '0';
  const v = block.getFieldValue('VAR');
  if (fn === 'Sqr') {
    return `${v} := ${x} * ${x}\n`;
  }
  if (AHK_VERSION === 'v2') {
    return `${v} := ${fn}(${x})\n`;
  }
  return `${v} := ${fn}(${x})\n`;
};

Blockly.Ahk['ahk_minmax'] = function (block) {
  const fn = block.getFieldValue('FN');
  const a = block.getFieldValue('A');
  const b = block.getFieldValue('B');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    return `${v} := ${fn}(${a}, ${b})\n`;
  }
  return `${v} := ${fn}(${a}, ${b})\n`;
};

Blockly.Ahk['ahk_round'] = function (block) {
  const num = Blockly.Ahk.valueToCode(block, 'NUM', Blockly.Ahk.ORDER_NONE) || '0';
  const decimals = block.getFieldValue('DECIMALS');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    return `${v} := Round(${num}, ${decimals})\n`;
  }
  return `${v} := Round(${num}, ${decimals})\n`;
};

// ============================================
// DATE/TIME GENERATORS
// ============================================

Blockly.Ahk['ahk_format_time'] = function (block) {
  const fmt = block.getFieldValue('FORMAT');
  const input = block.getFieldValue('INPUT');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    if (input) return `${v} := FormatTime(${q(input)}, ${q(fmt)})\n`;
    return `${v} := FormatTime(, ${q(fmt)})\n`;
  }
  if (input) return `FormatTime, ${v}, ${input}, ${fmt}\n`;
  return `FormatTime, ${v}, , ${fmt}\n`;
};

Blockly.Ahk['ahk_dateadd'] = function (block) {
  const amount = block.getFieldValue('AMOUNT');
  const units = block.getFieldValue('UNITS');
  const input = block.getFieldValue('INPUT');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    if (input) return `${v} := DateAdd(${q(input)}, ${amount}, "${units}")\n`;
    return `${v} := DateAdd(A_Now, ${amount}, "${units}")\n`;
  }
  return `EnvAdd, ${v}, ${amount}, ${units}\n`;
};

Blockly.Ahk['ahk_datediff'] = function (block) {
  const d1 = block.getFieldValue('DATE1');
  const d2 = block.getFieldValue('DATE2');
  const units = block.getFieldValue('UNITS');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    return `${v} := DateDiff(${q(d1 || '')}, ${q(d2 || '')}, "${units}")\n`;
  }
  return `EnvSub, ${v}, ${d1 || ''}, ${units}\n`;
};

// ============================================
// REGISTRY / INI GENERATORS
// ============================================

Blockly.Ahk['ahk_reg_read'] = function (block) {
  const root = block.getFieldValue('ROOT');
  const subkey = block.getFieldValue('SUBKEY');
  const valname = block.getFieldValue('VALNAME');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    return `${v} := RegRead("${root}\\${subkey}", ${q(valname)})\n`;
  }
  return `RegRead, ${v}, ${root}\\${subkey}, ${valname}\n`;
};

Blockly.Ahk['ahk_reg_write'] = function (block) {
  const root = block.getFieldValue('ROOT');
  const subkey = block.getFieldValue('SUBKEY');
  const valname = block.getFieldValue('VALNAME');
  const val = block.getFieldValue('VALUE');
  const type = block.getFieldValue('TYPE');
  if (AHK_VERSION === 'v2') {
    return `RegWrite(${q(val)}, "${type}", "${root}\\${subkey}", ${q(valname)})\n`;
  }
  return `RegWrite, ${valname}, ${type}, ${root}\\${subkey}, ${val}\n`;
};

Blockly.Ahk['ahk_ini_read'] = function (block) {
  const file = block.getFieldValue('FILE');
  const section = block.getFieldValue('SECTION');
  const key = block.getFieldValue('KEY');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    return `${v} := IniRead(${q(file)}, ${q(section)}, ${q(key)})\n`;
  }
  return `IniRead, ${v}, ${file}, ${section}, ${key}\n`;
};

Blockly.Ahk['ahk_ini_write'] = function (block) {
  const file = block.getFieldValue('FILE');
  const section = block.getFieldValue('SECTION');
  const key = block.getFieldValue('KEY');
  const val = block.getFieldValue('VALUE');
  if (AHK_VERSION === 'v2') {
    return `IniWrite(${q(val)}, ${q(file)}, ${q(section)}, ${q(key)})\n`;
  }
  return `IniWrite, ${val}, ${file}, ${section}, ${key}\n`;
};

// ============================================
// FILE EXTENDED GENERATORS
// ============================================

Blockly.Ahk['ahk_file_move'] = function (block) {
  const src = block.getFieldValue('SOURCE');
  const dst = block.getFieldValue('DEST');
  const overwrite = block.getFieldValue('OVERWRITE') ? '1' : '0';
  if (AHK_VERSION === 'v2') {
    return cmd('FileMove', [q(src), q(dst), overwrite]);
  }
  return `FileMove, ${src}, ${dst}, ${overwrite}\n`;
};

Blockly.Ahk['ahk_file_exist'] = function (block) {
  const path = block.getFieldValue('PATH');
  // Both v1 and v2 need quotes for FileExist() function syntax
  return [`FileExist("${path}")`, Blockly.Ahk.ORDER_ATOMIC];
};

Blockly.Ahk['ahk_split_path'] = function (block) {
  const path = Blockly.Ahk.valueToCode(block, 'PATH', Blockly.Ahk.ORDER_NONE) || '""';
  const vn = block.getFieldValue('VARNAME');
  const vd = block.getFieldValue('VARDIR');
  const ve = block.getFieldValue('VAREXT');
  if (AHK_VERSION === 'v2') {
    return `SplitPath(${path}, &${vn}, &${vd}, &${ve})\n`;
  }
  return `SplitPath, ${path}, ${vn}, ${vd}, ${ve}\n`;
};

Blockly.Ahk['ahk_dir_create'] = function (block) {
  const dir = block.getFieldValue('DIR');
  const fn = AHK_VERSION === 'v2' ? 'DirCreate' : 'DirCreate';
  // v1 also has DirCreate as of newer versions; fallback to FileCreateDir
  if (AHK_VERSION === 'v2') return cmd('DirCreate', [q(dir)]);
  return `FileCreateDir, ${dir}\n`;
};

// ============================================
// CONTROL GENERATORS
// ============================================

Blockly.Ahk['ahk_control_click'] = function (block) {
  const control = block.getFieldValue('CONTROL');
  const title = block.getFieldValue('TITLE');
  if (AHK_VERSION === 'v2') {
    return cmd('ControlClick', [q(control), q(title)]);
  }
  return `ControlClick, ${control}, ${title}\n`;
};

Blockly.Ahk['ahk_control_get_text'] = function (block) {
  const control = block.getFieldValue('CONTROL');
  const title = block.getFieldValue('TITLE');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    return `${v} := ControlGetText(${q(control)}, ${q(title)})\n`;
  }
  return `ControlGetText, ${v}, ${control}, ${title}\n`;
};

Blockly.Ahk['ahk_control_send'] = function (block) {
  const control = block.getFieldValue('CONTROL');
  const keys = block.getFieldValue('KEYS');
  const title = block.getFieldValue('TITLE');
  if (AHK_VERSION === 'v2') {
    return cmd('ControlSend', [q(keys), q(control), q(title)]);
  }
  return `ControlSend, ${control}, ${keys}, ${title}\n`;
};

Blockly.Ahk['ahk_control_set_text'] = function (block) {
  const control = block.getFieldValue('CONTROL');
  const text = block.getFieldValue('TEXT');
  const title = block.getFieldValue('TITLE');
  if (AHK_VERSION === 'v2') {
    return cmd('ControlSetText', [q(control), q(text), q(title)]);
  }
  return `ControlSetText, ${control}, ${text}, ${title}\n`;
};

// ============================================
// SYSTEM GENERATORS
// ============================================

Blockly.Ahk['ahk_set_timer'] = function (block) {
  const label = block.getFieldValue('LABEL');
  const ms = block.getFieldValue('MS');
  const priority = block.getFieldValue('PRIORITY');
  if (AHK_VERSION === 'v2') {
    return `SetTimer ${label}, ${ms}\n`;
  }
  return `SetTimer, ${label}, ${ms}\n`;
};

Blockly.Ahk['ahk_get_key_state'] = function (block) {
  const key = block.getFieldValue('KEY');
  const mode = block.getFieldValue('MODE');
  if (mode === 'toggled') {
    return [`GetKeyState("${key}", "T")
`, Blockly.Ahk.ORDER_ATOMIC];
  }
  return [`GetKeyState("${key}")
`, Blockly.Ahk.ORDER_ATOMIC];
};

Blockly.Ahk['ahk_set_capslock'] = function (block) {
  const key = block.getFieldValue('KEY');
  const state = block.getFieldValue('STATE');
  if (AHK_VERSION === 'v2') {
    return `Set${key}State("${state}")\n`;
  }
  return `Set${key}State, ${state}\n`;
};

Blockly.Ahk['ahk_coord_mode'] = function (block) {
  const target = block.getFieldValue('TARGET');
  const mode = block.getFieldValue('MODE');
  if (AHK_VERSION === 'v2') {
    return cmd('CoordMode', [q(target), q(mode)]);
  }
  return `CoordMode, ${target}, ${mode}\n`;
};

Blockly.Ahk['ahk_dll_call'] = function (block) {
  const func = block.getFieldValue('FUNC');
  const types = block.getFieldValue('TYPES');
  const retType = block.getFieldValue('RETURNTYPE');
  const a1 = block.getFieldValue('ARG1');
  const a2 = block.getFieldValue('ARG2');
  const a3 = block.getFieldValue('ARG3');
  const v = block.getFieldValue('VAR');
  const typeNames = types.split(' ').filter(t => t.trim());
  const vals = [a1, a2, a3];
  // Interleave types and args: DllCall("func", "type1", arg1, "type2", arg2, ..., "RetType")
  const parts = [];
  for (let i = 0; i < typeNames.length && i < vals.length; i++) {
    parts.push(`"${typeNames[i]}"`);
    parts.push(vals[i] || '0');
  }
  const callParts = `"${func}", ${parts.join(', ')}, "${retType}"`;
  if (AHK_VERSION === 'v2') {
    return `${v} := DllCall(${callParts})\n`;
  }
  return `${v} := DllCall(${callParts})\n`;
};

Blockly.Ahk['ahk_com_object'] = function (block) {
  const cls = block.getFieldValue('CLASS');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    return `${v} := ComObject("${cls}")\n`;
  }
  return `${v} := ComObjCreate("${cls}")\n`;
};

Blockly.Ahk['ahk_download'] = function (block) {
  const url = block.getFieldValue('URL');
  const file = block.getFieldValue('FILE');
  if (AHK_VERSION === 'v2') {
    return cmd('Download', [q(url), q(file)]);
  }
  return `UrlDownloadToFile, ${url}, ${file}\n`;
};

// ============================================
// BOOLEAN / CONSTANT GENERATORS
// ============================================

Blockly.Ahk['ahk_boolean'] = function (block) {
  const val = block.getFieldValue('VALUE');
  return [val, Blockly.Ahk.ORDER_ATOMIC];
};

Blockly.Ahk['ahk_type_check'] = function (block) {
  const val = Blockly.Ahk.valueToCode(block, 'VALUE', Blockly.Ahk.ORDER_NONE) || '""';
  const check = block.getFieldValue('CHECK');
  if (check === 'IsLabel') {
    return [`IsLabel(${val})`, Blockly.Ahk.ORDER_ATOMIC];
  }
  return [`${check}(${val})`, Blockly.Ahk.ORDER_ATOMIC];
};

// ============================================
// OBJECT GENERATORS
// ============================================

Blockly.Ahk['ahk_array'] = function (block) {
  const items = block.getFieldValue('ITEMS');
  const v = block.getFieldValue('VAR');
  // Parse comma-separated items
  const itemList = items.split(',').map(i => i.trim()).filter(i => i).join(', ');
  return `${v} := [${itemList}]\n`;
};

Blockly.Ahk['ahk_map'] = function (block) {
  const pairs = block.getFieldValue('PAIRS');
  const v = block.getFieldValue('VAR');
  // Parse comma-separated pairs into Map(key, val, key2, val2) syntax
  const items = pairs.split(',').map(i => i.trim()).filter(i => i);
  const quoted = items.map(i => `"${i}"`).join(', ');
  if (AHK_VERSION === 'v2') {
    return `${v} := Map(${quoted})\n`;
  }
  return `${v} := Object()\n; Map is v2-only, using Object instead\n`;
};

Blockly.Ahk['ahk_object'] = function (block) {
  const props = block.getFieldValue('PROPS');
  const v = block.getFieldValue('VAR');
  // Parse comma-separated key,val pairs into object literal {key: "val", key2: "val2"} syntax
  const items = props.split(',').map(i => i.trim()).filter(i => i);
  const pairs = [];
  for (let i = 0; i < items.length - 1; i += 2) {
    pairs.push(`${items[i]}: "${items[i+1]}"`);
  }
  if (pairs.length === 0 && items.length === 1) {
    pairs.push(`${items[0]}: ""`);
  }
  return `${v} := {${pairs.join(', ')}}\n`;
};

// ============================================
// PIXEL GENERATORS
// ============================================

Blockly.Ahk['ahk_pixel_get_color'] = function (block) {
  const x = block.getFieldValue('X');
  const y = block.getFieldValue('Y');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    // v2: PixelGetColor returns a value
    return `${v} := PixelGetColor(${x}, ${y})\n`;
  }
  return `PixelGetColor, ${v}, ${x}, ${y}\n`;
};

// ============================================
// WINDOW EXTENDED GENERATORS
// ============================================

Blockly.Ahk['ahk_win_set_title'] = function (block) {
  const title = block.getFieldValue('TITLE');
  const newTitle = block.getFieldValue('NEWTITLE');
  if (AHK_VERSION === 'v2') {
    return cmd('WinSetTitle', [q(title), '', q(newTitle)]);
  }
  return `WinSetTitle, ${title}, , ${newTitle}\n`;
};

Blockly.Ahk['ahk_win_hide'] = function (block) {
  const title = block.getFieldValue('TITLE');
  if (AHK_VERSION === 'v2') {
    return cmd('WinHide', [q(title)]);
  }
  return `WinHide, ${title}\n`;
};

Blockly.Ahk['ahk_win_show'] = function (block) {
  const title = block.getFieldValue('TITLE');
  if (AHK_VERSION === 'v2') {
    return cmd('WinShow', [q(title)]);
  }
  return `WinShow, ${title}\n`;
};

Blockly.Ahk['ahk_win_set_always_on_top'] = function (block) {
  const title = block.getFieldValue('TITLE');
  const state = block.getFieldValue('STATE');
  if (AHK_VERSION === 'v2') {
    return `WinSetAlwaysOnTop(${state === 'Toggle' ? '-1' : q(state)}, ${q(title)})\n`;
  }
  return `WinSet, AlwaysOnTop, ${state}, ${title}\n`;
};

Blockly.Ahk['ahk_win_get_class'] = function (block) {
  const title = block.getFieldValue('TITLE');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    return `${v} := WinGetClass(${q(title)})\n`;
  }
  return `WinGetClass, ${v}, ${title}\n`;
};

Blockly.Ahk['ahk_win_get_id'] = function (block) {
  const title = block.getFieldValue('TITLE');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') {
    return `${v} := WinGetID(${q(title)})\n`;
  }
  return `WinGet, ${v}, ID, ${title}\n`;
};

// ============================================
// SOUND EXTENDED GENERATORS
// ============================================

Blockly.Ahk['ahk_sound_volume'] = function (block) {
  const action = block.getFieldValue('ACTION');
  const value = block.getFieldValue('VALUE');
  const device = block.getFieldValue('DEVICE');
  const component = block.getFieldValue('COMPONENT');
  const v = block.getFieldValue('VAR');
  
  if (action === 'get') {
    if (AHK_VERSION === 'v2') return `${v} := SoundGetVolume(${device}, ${q(component)})\n`;
    return `SoundGet, ${v}, , ${component}, ${device}\n`;
  }
  if (action === 'set') {
    if (AHK_VERSION === 'v2') return `SoundSetVolume(${value}, ${device}, ${q(component)})\n`;
    return `SoundSet, ${value}, , ${component}, ${device}\n`;
  }
  if (action === 'getmute') {
    if (AHK_VERSION === 'v2') return `${v} := SoundGetMute(${device}, ${q(component)})\n`;
    return `SoundGet, ${v}, , mute, ${component}, ${device}\n`;
  }
  if (action === 'setmute') {
    if (AHK_VERSION === 'v2') return `SoundSetMute(${value > 50 ? 1 : 0}, ${device}, ${q(component)})\n`;
    return `SoundSet, ${value > 50 ? 1 : 0}, , mute, ${component}, ${device}\n`;
  }
  return '';
};

// ============================================
// MISC GENERATORS
// ============================================

Blockly.Ahk['ahk_tray_tip'] = function (block) {
  const title = block.getFieldValue('TITLE');
  const text = block.getFieldValue('TEXT');
  const timeout = block.getFieldValue('TIMEOUT');
  if (AHK_VERSION === 'v2') {
    return `TrayTip(${q(title)}, ${q(text)}, ${timeout * 1000})\n`;
  }
  return `TrayTip, ${title}, ${text}, , ${timeout}
`;
};

Blockly.Ahk['ahk_clip_wait'] = function (block) {
  const content = block.getFieldValue('CONTENT');
  const timeout = block.getFieldValue('TIMEOUT');
  if (AHK_VERSION === 'v2') {
    return `ClipWait(${timeout}, ${content === 'AnyData' ? 0 : 1})\n`;
  }
  return `ClipWait, ${timeout}, ${content === 'AnyData' ? 0 : 1}\n`;
};

Blockly.Ahk['ahk_suspend'] = function (block) {
  const mode = block.getFieldValue('MODE');
  if (AHK_VERSION === 'v2') {
    return `Suspend("${mode}")\n`;
  }
  return `Suspend, ${mode}\n`;
};

// ============================================
// v1-SPECIFIC STRING GENERATORS
// ============================================

// StringLen (v1 command)
Blockly.Ahk['ahk_strlen_v1'] = function (block) {
  const out = block.getFieldValue('OUTVAR');
  const inv = block.getFieldValue('INVAR');
  return `StringLen, ${out}, ${inv}\n`;
};

// StringMid
Blockly.Ahk['ahk_string_mid'] = function (block) {
  const out = block.getFieldValue('OUTVAR');
  const inv = block.getFieldValue('INVAR');
  const start = block.getFieldValue('START');
  const count = block.getFieldValue('COUNT');
  return `StringMid, ${out}, ${inv}, ${start}, ${count}\n`;
};

// StringSplit
Blockly.Ahk['ahk_string_split'] = function (block) {
  const arr = block.getFieldValue('ARRAY');
  const inv = block.getFieldValue('INVAR');
  const del = block.getFieldValue('DELIMITERS');
  const omit = block.getFieldValue('OMITCHARS');
  if (omit) return `StringSplit, ${arr}, ${inv}, ${del}, ${omit}\n`;
  return `StringSplit, ${arr}, ${inv}, ${del}\n`;
};

// StringTrimLeft / StringTrimRight
Blockly.Ahk['ahk_string_trim_v1'] = function (block) {
  const side = block.getFieldValue('SIDE');
  const out = block.getFieldValue('OUTVAR');
  const inv = block.getFieldValue('INVAR');
  const count = block.getFieldValue('COUNT');
  return `StringTrim${side === 'L' ? 'Left' : 'Right'}, ${out}, ${inv}, ${count}\n`;
};

// StringGetPos
Blockly.Ahk['ahk_string_get_pos'] = function (block) {
  const out = block.getFieldValue('OUTVAR');
  const inv = block.getFieldValue('INVAR');
  const search = block.getFieldValue('SEARCHTEXT');
  const side = block.getFieldValue('SIDE');
  if (side !== '') return `StringGetPos, ${out}, ${inv}, ${search}, ${side}\n`;
  return `StringGetPos, ${out}, ${inv}, ${search}\n`;
};

// Chr / Ord / Asc
Blockly.Ahk['ahk_chr_ord'] = function (block) {
  const fn = block.getFieldValue('FN');
  const input = block.getFieldValue('INPUT');
  const v = block.getFieldValue('VAR');
  return `${v} := ${fn}(${input})\n`;
};

// RegExMatch
Blockly.Ahk['ahk_regex_match'] = function (block) {
  const haystack = block.getFieldValue('HAYSTACK');
  const regex = block.getFieldValue('REGEX');
  const out = block.getFieldValue('OUTVAR');
  const start = block.getFieldValue('START');
  // v1 command syntax: no quotes needed around pattern
  return `RegExMatch, ${haystack}, ${regex}, ${out}, ${start}\n`;
};

// RegExReplace
Blockly.Ahk['ahk_regex_replace'] = function (block) {
  const haystack = block.getFieldValue('HAYSTACK');
  const regex = block.getFieldValue('REGEX');
  const v = block.getFieldValue('VAR');
  const repl = block.getFieldValue('REPLACEMENT') || '';
  // v1 command syntax: no quotes needed
  return `RegExReplace, ${haystack}, ${regex}, ${repl}\n`;
};

// StringCaseSense
Blockly.Ahk['ahk_string_case_sense'] = function (block) {
  const mode = block.getFieldValue('MODE');
  return `StringCaseSense, ${mode}\n`;
};

// ============================================
// LOOP VARIANT GENERATORS
// ============================================

// Loop Files
Blockly.Ahk['ahk_loop_files'] = function (block) {
  const pattern = block.getFieldValue('PATTERN');
  const mode = block.getFieldValue('MODE');
  const actions = Blockly.Ahk.statementToCode(block, 'ACTIONS');
  const indented = actions.split('\n').map(l => l ? '    ' + l : l).join('\n');
  if (mode) {
    return `Loop, Files, ${pattern}, ${mode}\n${indented}\n`;
  }
  return `Loop, Files, ${pattern}\n${indented}\n`;
};

// Loop Read
Blockly.Ahk['ahk_loop_read'] = function (block) {
  const file = block.getFieldValue('FILE');
  const actions = Blockly.Ahk.statementToCode(block, 'ACTIONS');
  const indented = actions.split('\n').map(l => l ? '    ' + l : l).join('\n');
  return `Loop, Read, ${file}\n${indented}\n`;
};

// Loop Parse
Blockly.Ahk['ahk_loop_parse'] = function (block) {
  const input = block.getFieldValue('INPUT');
  const delimiters = block.getFieldValue('DELIMITERS');
  const omit = block.getFieldValue('OMIT');
  const actions = Blockly.Ahk.statementToCode(block, 'ACTIONS');
  const indented = actions.split('\n').map(l => l ? '    ' + l : l).join('\n');
  if (omit) return `Loop, Parse, ${input}, ${delimiters}, ${omit}\n${indented}\n`;
  return `Loop, Parse, ${input}, ${delimiters}\n${indented}\n`;
};

// For Loop
Blockly.Ahk['ahk_for_loop'] = function (block) {
  const key = block.getFieldValue('KEYVAR');
  const val = block.getFieldValue('VALVAR');
  const obj = block.getFieldValue('OBJECT');
  const actions = Blockly.Ahk.statementToCode(block, 'ACTIONS');
  const indented = actions.split('\n').map(l => l ? '    ' + l : l).join('\n');
  if (val) return `For ${key}, ${val} in ${obj}\n${indented}\n`;
  return `For ${key} in ${obj}\n${indented}\n`;
};

// Loop Until
Blockly.Ahk['ahk_loop_until'] = function (block) {
  const count = block.getFieldValue('COUNT');
  const condition = block.getFieldValue('CONDITION');
  const actions = Blockly.Ahk.statementToCode(block, 'ACTIONS');
  const indented = actions.split('\n').map(l => l ? '    ' + l : l).join('\n');
  if (condition) return `Loop, ${count}\n${indented}Until (${condition})\n`;
  return `Loop, ${count}\n${indented}\n`;
};

// ============================================
// FILE EXTENDED GENERATORS
// ============================================

// FileReadLine
Blockly.Ahk['ahk_file_read_line'] = function (block) {
  const out = block.getFieldValue('OUTVAR');
  const file = block.getFieldValue('FILE');
  const line = block.getFieldValue('LINE');
  return `FileReadLine, ${out}, ${file}, ${line}\n`;
};

// FileGetSize
Blockly.Ahk['ahk_file_get_size'] = function (block) {
  const out = block.getFieldValue('OUTVAR');
  const file = block.getFieldValue('FILE');
  const units = block.getFieldValue('UNITS');
  if (units) return `FileGetSize, ${out}, ${file}, ${units}\n`;
  return `FileGetSize, ${out}, ${file}\n`;
};

// FileGetTime / FileSetTime
Blockly.Ahk['ahk_file_time'] = function (block) {
  const action = block.getFieldValue('ACTION');
  const outOrVal = block.getFieldValue('OUTVAR');
  const file = block.getFieldValue('FILE');
  const which = block.getFieldValue('WHICHTIME');
  if (action === 'get') return `FileGetTime, ${outOrVal}, ${file}, ${which}\n`;
  // For FileSetTime, OUTVAR contains the YYYYMMDDHH24MISS timestamp value
  return `FileSetTime, ${outOrVal}, ${file}, ${which}\n`;
};

// FileGetAttrib / FileSetAttrib
Blockly.Ahk['ahk_file_attrib'] = function (block) {
  const action = block.getFieldValue('ACTION');
  const out = block.getFieldValue('OUTVAR');
  const file = block.getFieldValue('FILE');
  const attribs = block.getFieldValue('ATTRIBS');
  if (action === 'get') return `FileGetAttrib, ${out}, ${file}\n`;
  return `FileSetAttrib, ${attribs}, ${file}\n`;
};

// FileGetVersion
Blockly.Ahk['ahk_file_get_version'] = function (block) {
  const out = block.getFieldValue('OUTVAR');
  const file = block.getFieldValue('FILE');
  return `FileGetVersion, ${out}, ${file}\n`;
};

// FileRecycle
Blockly.Ahk['ahk_file_recycle'] = function (block) {
  const file = block.getFieldValue('FILE');
  return `FileRecycle, ${file}\n`;
};

// FileSelectFile / FileSelectFolder
Blockly.Ahk['ahk_file_select'] = function (block) {
  const dialog = block.getFieldValue('DIALOG');
  const out = block.getFieldValue('OUTVAR');
  const title = block.getFieldValue('TITLE');
  const filter = block.getFieldValue('FILTER');
  if (dialog === 'file') {
    return `FileSelectFile, ${out}, , , ${title}, ${filter}\n`;
  }
  return `FileSelectFolder, ${out}, , , ${title}\n`;
};

// FileRemoveDir
Blockly.Ahk['ahk_file_remove_dir'] = function (block) {
  const dir = block.getFieldValue('DIR');
  const recurse = block.getFieldValue('RECURSE') ? '1' : '0';
  return `FileRemoveDir, ${dir}, ${recurse}\n`;
};

// FileCopyDir / FileMoveDir
Blockly.Ahk['ahk_file_copy_dir'] = function (block) {
  const action = block.getFieldValue('ACTION');
  const src = block.getFieldValue('SOURCE');
  const dst = block.getFieldValue('DEST');
  const overwrite = block.getFieldValue('OVERWRITE') ? '1' : '0';
  const cmd = action === 'copy' ? 'FileCopyDir' : 'FileMoveDir';
  return `${cmd}, ${src}, ${dst}, ${overwrite}\n`;
};

// FileCreateShortcut
Blockly.Ahk['ahk_file_shortcut'] = function (block) {
  const target = block.getFieldValue('TARGET');
  const link = block.getFieldValue('LINK');
  const args = block.getFieldValue('ARGS');
  const workdir = block.getFieldValue('WORKDIR');
  const desc = block.getFieldValue('DESC');
  return `FileCreateShortcut, ${target}, ${link}, ${workdir}, ${args}, ${desc}\n`;
};

// ============================================
// WINDOW EXTENDED v1 GENERATORS
// ============================================

// WinKill
Blockly.Ahk['ahk_win_kill'] = function (block) {
  const title = block.getFieldValue('TITLE');
  return `WinKill, ${title}\n`;
};

// WinRestore
Blockly.Ahk['ahk_win_restore'] = function (block) {
  const title = block.getFieldValue('TITLE');
  return `WinRestore, ${title}\n`;
};

// WinGet with subcommands
Blockly.Ahk['ahk_win_get'] = function (block) {
  const out = block.getFieldValue('OUTVAR');
  const sub = block.getFieldValue('SUBCOMMAND');
  const title = block.getFieldValue('TITLE');
  return `WinGet, ${out}, ${sub}, ${title}\n`;
};

// WinSet
Blockly.Ahk['ahk_win_set'] = function (block) {
  const sub = block.getFieldValue('SUBCOMMAND');
  const val = block.getFieldValue('VALUE');
  const title = block.getFieldValue('TITLE');
  return `WinSet, ${sub}, ${val}, ${title}\n`;
};

// WinMinimizeAll / WinMinimizeAllUndo
Blockly.Ahk['ahk_win_minimize_all'] = function (block) {
  const action = block.getFieldValue('ACTION');
  if (action === 'All') return `WinMinimizeAll\n`;
  return `WinMinimizeAllUndo\n`;
};

// WinGetText
Blockly.Ahk['ahk_win_get_text'] = function (block) {
  const v = block.getFieldValue('VAR');
  const title = block.getFieldValue('TITLE');
  return `WinGetText, ${v}, ${title}\n`;
};

// SetTitleMatchMode
Blockly.Ahk['ahk_set_title_match'] = function (block) {
  const mode = block.getFieldValue('MODE');
  return `SetTitleMatchMode, ${mode}\n`;
};

// ============================================
// CONTROL EXTENDED GENERATORS
// ============================================

// ControlFocus / ControlGetFocus
Blockly.Ahk['ahk_control_focus'] = function (block) {
  const action = block.getFieldValue('ACTION');
  const control = block.getFieldValue('CONTROL');
  const title = block.getFieldValue('TITLE');
  if (action === 'focus') return `ControlFocus, ${control}, ${title}\n`;
  return `ControlGetFocus, ${control || ''}, ${title}\n`;
};

// ControlGetPos
Blockly.Ahk['ahk_control_get_pos'] = function (block) {
  const control = block.getFieldValue('CONTROL');
  const vx = block.getFieldValue('VARX');
  const vy = block.getFieldValue('VARY');
  const vw = block.getFieldValue('VARW');
  const vh = block.getFieldValue('VARH');
  const title = block.getFieldValue('TITLE');
  return `ControlGetPos, ${vx}, ${vy}, ${vw}, ${vh}, ${control}, ${title}\n`;
};

// PostMessage / SendMessage
Blockly.Ahk['ahk_post_message'] = function (block) {
  const action = block.getFieldValue('ACTION');
  const msg = block.getFieldValue('MSG');
  const wp = block.getFieldValue('WPARAM');
  const lp = block.getFieldValue('LPARAM');
  const control = block.getFieldValue('CONTROL');
  const title = block.getFieldValue('TITLE');
  const cmd = action === 'Post' ? 'PostMessage' : 'SendMessage';
  return `${cmd}, ${msg}, ${wp}, ${lp}, ${control}, ${title}\n`;
};

// StatusBarGetText / StatusBarWait
Blockly.Ahk['ahk_status_bar'] = function (block) {
  const action = block.getFieldValue('ACTION');
  const v = block.getFieldValue('VAR');
  const part = block.getFieldValue('PART');
  const title = block.getFieldValue('TITLE');
  if (action === 'get') return `StatusBarGetText, ${v}, ${part}, ${title}\n`;
  return `StatusBarWait, ${v}, ${part}, ${title}\n`;
};

// ============================================
// SYSTEM EXTENDED GENERATORS
// ============================================

// SysGet
Blockly.Ahk['ahk_sys_get'] = function (block) {
  const v = block.getFieldValue('VAR');
  const sub = block.getFieldValue('SUBCOMMAND');
  const num = block.getFieldValue('NUMBER');
  if (num && num > 0) return `SysGet, ${v}, ${num}\n`;
  // subcommand might be a name or number
  return `SysGet, ${v}, ${sub}\n`;
};

// Pause
Blockly.Ahk['ahk_pause'] = function (block) {
  const mode = block.getFieldValue('MODE');
  return `Pause, ${mode}\n`;
};

// Debug commands (ListVars, OutputDebug, etc)
Blockly.Ahk['ahk_debug_commands'] = function (block) {
  const cmd = block.getFieldValue('CMD');
  const text = block.getFieldValue('TEXT');
  if (cmd === 'OutputDebug') return `OutputDebug, ${text || 'debug'}\n`;
  return `${cmd}\n`;
};

// Critical
Blockly.Ahk['ahk_critical'] = function (block) {
  const mode = block.getFieldValue('MODE');
  return `Critical, ${mode}\n`;
};

// VarSetCapacity
Blockly.Ahk['ahk_var_set_capacity'] = function (block) {
  const v = block.getFieldValue('VAR');
  const size = block.getFieldValue('SIZE');
  const fill = block.getFieldValue('FILL');
  if (fill && fill !== 0) return `VarSetCapacity(${v}, ${size}, ${fill})\n`;
  return `VarSetCapacity(${v}, ${size})\n`;
};

// NumGet / NumPut
Blockly.Ahk['ahk_num_get_put'] = function (block) {
  const action = block.getFieldValue('ACTION');
  const v = block.getFieldValue('VAR');
  const offset = block.getFieldValue('OFFSET');
  const type = block.getFieldValue('TYPE');
  const value = block.getFieldValue('VALUE');
  const out = block.getFieldValue('OUTVAR');
  if (action === 'get') {
    if (offset !== 0) return `${out} := NumGet(${v}, ${offset}, ${type})\n`;
    return `${out} := NumGet(${v}, ${type})\n`;
  }
  if (offset !== 0) return `NumPut(${value}, ${v}, ${offset}, ${type})\n`;
  return `NumPut(${value}, ${v}, ${type})\n`;
};

// SetWorkingDir
Blockly.Ahk['ahk_set_working_dir'] = function (block) {
  const dir = block.getFieldValue('DIR');
  return `SetWorkingDir, ${dir}\n`;
};

// ============================================
// DIRECTIVE GENERATOR
// ============================================

Blockly.Ahk['ahk_directive'] = function (block) {
  const directive = block.getFieldValue('DIRECTIVE');
  return `#${directive}\n`;
};

// ============================================
// SOUND EXTENDED GENERATORS
// ============================================

// SoundGet / SoundSet
Blockly.Ahk['ahk_sound_get_set'] = function (block) {
  const action = block.getFieldValue('ACTION');
  const out = block.getFieldValue('OUTVAR');
  const value = block.getFieldValue('VALUE');
  const component = block.getFieldValue('COMPONENT');
  const ctrlType = block.getFieldValue('CTRLTYPE');
  if (action === 'get') {
    if (ctrlType) return `SoundGet, ${out}, , ${ctrlType}, ${component}\n`;
    return `SoundGet, ${out}, , ${component}\n`;
  }
  if (ctrlType) return `SoundSet, ${value}, , ${ctrlType}, ${component}\n`;
  return `SoundSet, ${value}, , ${component}\n`;
};

// SoundGetWaveVolume / SoundSetWaveVolume
Blockly.Ahk['ahk_sound_wave'] = function (block) {
  const action = block.getFieldValue('ACTION');
  const out = block.getFieldValue('OUTVAR');
  const value = block.getFieldValue('VALUE');
  if (action === 'get') return `SoundGetWaveVolume, ${out}\n`;
  return `SoundSetWaveVolume, ${value}\n`;
};

// ============================================
// REGISTRY EXTENDED GENERATOR
// ============================================

// RegDelete
Blockly.Ahk['ahk_reg_delete'] = function (block) {
  const root = block.getFieldValue('ROOT');
  const subkey = block.getFieldValue('SUBKEY');
  const valname = block.getFieldValue('VALNAME');
  if (valname) return `RegDelete, ${root}\\${subkey}, ${valname}\n`;
  return `RegDelete, ${root}\\${subkey}\n`;
};

// ============================================
// INI EXTENDED GENERATOR
// ============================================

// IniDelete
Blockly.Ahk['ahk_ini_delete'] = function (block) {
  const file = block.getFieldValue('FILE');
  const section = block.getFieldValue('SECTION');
  const key = block.getFieldValue('KEY');
  if (key) return `IniDelete, ${file}, ${section}, ${key}\n`;
  return `IniDelete, ${file}, ${section}\n`;
};

// ============================================
// DIALOG EXTENDED GENERATORS
// ============================================

// Progress
Blockly.Ahk['ahk_progress'] = function (block) {
  const value = block.getFieldValue('VALUE');
  const text = block.getFieldValue('TEXT');
  const title = block.getFieldValue('TITLE');
  return `Progress, ${value}, ${text}, ${title}\n`;
};

// SplashImage
Blockly.Ahk['ahk_splash_image'] = function (block) {
  const img = block.getFieldValue('IMAGE');
  const opts = block.getFieldValue('OPTIONS');
  const text = block.getFieldValue('TEXT');
  if (opts && text) return `SplashImage, ${img}, ${opts}, ${text}\n`;
  if (opts) return `SplashImage, ${img}, ${opts}\n`;
  return `SplashImage, ${img}\n`;
};

// ============================================
// MATH EXTENDED GENERATOR
// ============================================

// Mod
Blockly.Ahk['ahk_mod'] = function (block) {
  const a = block.getFieldValue('A');
  const b = block.getFieldValue('B');
  const v = block.getFieldValue('VAR');
  return `${v} := Mod(${a}, ${b})\n`;
};

// ============================================
// TIME EXTENDED GENERATOR
// ============================================

// EnvAdd / EnvSub
Blockly.Ahk['ahk_env_time'] = function (block) {
  const action = block.getFieldValue('ACTION');
  const v = block.getFieldValue('VAR');
  const value = block.getFieldValue('VALUE');
  const units = block.getFieldValue('UNITS');
  if (action === 'sub') {
    // EnvSub subtracts: EnvSub, Var, Value, Units 
    // But actually EnvSub usage: EnvSub, Var, Value, TimeUnits -> Var -= Value units
    return `EnvSub, ${v}, ${value}, ${units}\n`;
  }
  return `EnvAdd, ${v}, ${value}, ${units}\n`;
};

// ============================================
// NETWORK EXTENDED GENERATOR
// ============================================

// UrlDownloadToFile (alias for ahk_download - redirected)
Blockly.Ahk['ahk_url_download'] = function (block) {
  const url = block.getFieldValue('URL');
  const file = block.getFieldValue('FILE');
  return `UrlDownloadToFile, ${url}, ${file}\n`;
};

// ============================================
// GUI GENERATORS
// ============================================

// Gui, Show
Blockly.Ahk['ahk_gui_show'] = function (block) {
  const opts = block.getFieldValue('OPTIONS');
  const title = block.getFieldValue('TITLE');
  return `Gui, Show, ${opts || ''}, ${title}\n`;
};

// Gui, Add
Blockly.Ahk['ahk_gui_add'] = function (block) {
  const type = block.getFieldValue('CONTROLTYPE');
  const opts = block.getFieldValue('OPTIONS');
  const text = block.getFieldValue('TEXT');
  return `Gui, Add, ${type}, ${opts}, ${text}\n`;
};

// Gui, Hide / Destroy / etc
Blockly.Ahk['ahk_gui_hide'] = function (block) {
  const action = block.getFieldValue('ACTION');
  return `Gui, ${action}\n`;
};

// GuiControl
Blockly.Ahk['ahk_gui_control'] = function (block) {
  const sub = block.getFieldValue('SUBCOMMAND');
  const ctrlId = block.getFieldValue('CONTROLID');
  const val = block.getFieldValue('VALUE');
  return `GuiControl, ${sub}, ${ctrlId}, ${val}\n`;
};

// Gui, Font
Blockly.Ahk['ahk_gui_font'] = function (block) {
  const opts = block.getFieldValue('OPTIONS');
  const font = block.getFieldValue('FONTNAME');
  if (font) return `Gui, Font, ${opts || ''}, ${font}\n`;
  return `Gui, Font, ${opts || ''}\n`;
};

// Gui, Color
Blockly.Ahk['ahk_gui_color'] = function (block) {
  const bg = block.getFieldValue('BGCOLOR');
  const ctl = block.getFieldValue('CTLCOLOR');
  if (ctl) return `Gui, Color, ${bg}, ${ctl}\n`;
  return `Gui, Color, ${bg}\n`;
};

// Gui, Submit
Blockly.Ahk['ahk_gui_submit'] = function (block) {
  const nohide = block.getFieldValue('NOHIDE');
  if (nohide) return `Gui, Submit, NoHide\n`;
  return `Gui, Submit\n`;
};

// ============================================
// KEYBOARD EXTENDED GENERATORS
// ============================================

// SendRaw / SendPlay / SendEvent
Blockly.Ahk['ahk_send_variant'] = function (block) {
  const mode = block.getFieldValue('MODE');
  const keys = block.getFieldValue('KEYS');
  if (AHK_VERSION === 'v2') return `${mode}(${q(keys)})\n`;
  return `${mode}, ${keys}\n`;
};

// SetKeyDelay / SetMouseDelay / SetDefaultMouseSpeed
Blockly.Ahk['ahk_set_delay'] = function (block) {
  const cmd = block.getFieldValue('CMD');
  const delay = block.getFieldValue('DELAY');
  const pressDur = block.getFieldValue('PRESSDUR');
  if (AHK_VERSION === 'v2') {
    if (cmd === 'SetKeyDelay' && pressDur >= 0) return `${cmd}(${delay}, ${pressDur})\n`;
    return `${cmd}(${delay})\n`;
  }
  if (cmd === 'SetKeyDelay') {
    if (pressDur >= 0) return `${cmd}, ${delay}, ${pressDur}\n`;
    return `${cmd}, ${delay}\n`;
  }
  return `${cmd}, ${delay}\n`;
};

// SendLevel
Blockly.Ahk['ahk_send_level'] = function (block) {
  const level = block.getFieldValue('LEVEL');
  if (AHK_VERSION === 'v2') return `SendLevel(${level})\n`;
  return `SendLevel, ${level}\n`;
};

// ============================================
// WINDOW EXTENDED v2 GENERATORS
// ============================================

// WinWaitClose
Blockly.Ahk['ahk_win_wait_close'] = function (block) {
  const title = block.getFieldValue('TITLE');
  const timeout = block.getFieldValue('TIMEOUT');
  if (AHK_VERSION === 'v2') return cmd('WinWaitClose', [q(title), '', timeout]);
  return `WinWaitClose, ${title}, , ${timeout}\n`;
};

// WinWaitNotActive
Blockly.Ahk['ahk_win_wait_not_active'] = function (block) {
  const title = block.getFieldValue('TITLE');
  const timeout = block.getFieldValue('TIMEOUT');
  if (AHK_VERSION === 'v2') return cmd('WinWaitNotActive', [q(title), '', timeout]);
  return `WinWaitNotActive, ${title}, , ${timeout}\n`;
};

// WinActive (expression)
Blockly.Ahk['ahk_win_active'] = function (block) {
  const title = block.getFieldValue('TITLE');
  return [`WinActive("${title}")`, Blockly.Ahk.ORDER_ATOMIC];
};

// WinRedraw
Blockly.Ahk['ahk_win_redraw'] = function (block) {
  const title = block.getFieldValue('TITLE');
  if (AHK_VERSION === 'v2') return cmd('WinRedraw', [q(title)]);
  return `WinRedraw, ${title}\n`;
};

// ============================================
// CONTROL EXTENDED v2 GENERATORS
// ============================================

// ControlMove
Blockly.Ahk['ahk_control_move'] = function (block) {
  const control = block.getFieldValue('CONTROL');
  const x = block.getFieldValue('X');
  const y = block.getFieldValue('Y');
  const w = block.getFieldValue('W');
  const h = block.getFieldValue('H');
  const title = block.getFieldValue('TITLE');
  if (AHK_VERSION === 'v2') return cmd('ControlMove', [q(control), x, y, w, h, q(title)]);
  return `ControlMove, ${control}, ${x}, ${y}, ${w}, ${h}, ${title}\n`;
};

// ControlSendRaw
Blockly.Ahk['ahk_control_send_raw'] = function (block) {
  const control = block.getFieldValue('CONTROL');
  const keys = block.getFieldValue('KEYS');
  const title = block.getFieldValue('TITLE');
  if (AHK_VERSION === 'v2') return cmd('ControlSend', [q(keys), q(control), q(title)]);
  return `ControlSendRaw, ${control}, ${keys}, ${title}\n`;
};

// ============================================
// HOTKEY / HOTSTRING GENERATORS
// ============================================

// Hotkey command
Blockly.Ahk['ahk_hotkey_cmd'] = function (block) {
  const key = block.getFieldValue('KEYNAME');
  const label = block.getFieldValue('LABEL');
  const opts = block.getFieldValue('OPTIONS');
  if (AHK_VERSION === 'v2') {
    if (opts) return `Hotkey("${key}", "${label}", "${opts}")\n`;
    return `Hotkey("${key}", "${label}")\n`;
  }
  if (opts) return `Hotkey, ${key}, ${label}, ${opts}\n`;
  return `Hotkey, ${key}, ${label}\n`;
};

// Hotstring
Blockly.Ahk['ahk_hotstring'] = function (block) {
  const trigger = block.getFieldValue('TRIGGER');
  const replacement = block.getFieldValue('REPLACEMENT');
  const opts = block.getFieldValue('OPTIONS');
  if (opts) return `::${opts}:${trigger}::${replacement}\n`;
  return `::${trigger}::${replacement}\n`;
};

// ============================================
// GOTO / GOSUB / RETURN GENERATORS
// ============================================

// Goto
Blockly.Ahk['ahk_goto'] = function (block) {
  const label = block.getFieldValue('LABEL');
  return `Goto, ${label}\n`;
};

// Gosub
Blockly.Ahk['ahk_gosub'] = function (block) {
  const label = block.getFieldValue('LABEL');
  return `Gosub, ${label}\n`;
};

// Return
Blockly.Ahk['ahk_return'] = function (block) {
  return `Return\n`;
};

// Label
Blockly.Ahk['ahk_label'] = function (block) {
  const name = block.getFieldValue('NAME');
  return `${name}:\n`;
};

// ============================================
// COM FUNCTIONS GENERATORS
// ============================================

// ComObjGet
Blockly.Ahk['ahk_com_obj_get'] = function (block) {
  const moniker = block.getFieldValue('MONIKER');
  const v = block.getFieldValue('VAR');
  return `${v} := ComObjGet("${moniker}")\n`;
};

// ComObjActive
Blockly.Ahk['ahk_com_obj_active'] = function (block) {
  const cls = block.getFieldValue('CLASS');
  const v = block.getFieldValue('VAR');
  if (AHK_VERSION === 'v2') return `${v} := ComObject("${cls}")\n`;
  return `${v} := ComObjActive("${cls}")\n`;
};

// ComObjConnect
Blockly.Ahk['ahk_com_obj_connect'] = function (block) {
  const obj = block.getFieldValue('OBJ');
  const prefix = block.getFieldValue('PREFIX');
  if (prefix) return `ComObjConnect(${obj}, "${prefix}")\n`;
  return `ComObjConnect(${obj})\n`;
};

// ============================================
// SCRIPT CONTROL GENERATORS
// ============================================

// SetBatchLines
Blockly.Ahk['ahk_set_batch_lines'] = function (block) {
  const ms = block.getFieldValue('MS');
  return `SetBatchLines, ${ms}\n`;
};

// SetEnv
Blockly.Ahk['ahk_set_env'] = function (block) {
  const v = block.getFieldValue('VAR');
  const val = block.getFieldValue('VALUE');
  return `SetEnv, ${v}, ${val}\n`;
};

// Thread
Blockly.Ahk['ahk_thread'] = function (block) {
  const sub = block.getFieldValue('SUBCOMMAND');
  const val = block.getFieldValue('VALUE');
  return `Thread, ${sub}, ${val}\n`;
};

// ============================================
// TRY / CATCH / THROW GENERATORS
// ============================================

// Try
Blockly.Ahk['ahk_try'] = function (block) {
  const actions = Blockly.Ahk.statementToCode(block, 'ACTIONS');
  const indented = actions.split('\n').map(l => l ? '    ' + l : l).join('\n');
  if (AHK_VERSION === 'v2') {
    return `Try {\n${indented}}\n`;
  }
  return `Try\n${indented}\n`;
};

// Catch
Blockly.Ahk['ahk_catch'] = function (block) {
  const errVar = block.getFieldValue('ERRVAR');
  const actions = Blockly.Ahk.statementToCode(block, 'ACTIONS');
  const indented = actions.split('\n').map(l => l ? '    ' + l : l).join('\n');
  if (AHK_VERSION === 'v2') {
    return `Catch ${errVar} {\n${indented}}\n`;
  }
  return `Catch, ${errVar}\n${indented}\n`;
};

// Throw
Blockly.Ahk['ahk_throw'] = function (block) {
  const expr = block.getFieldValue('EXPR');
  return `Throw ${expr}\n`;
};

// ============================================
// HOTIF GENERATOR
// ============================================

// HotIf
Blockly.Ahk['ahk_hot_if'] = function (block) {
  const mode = block.getFieldValue('MODE');
  const cond = block.getFieldValue('COND');
  if (AHK_VERSION === 'v2') {
    if (mode === 'expr') return `HotIf ${cond}\n`;
    if (mode === 'WinActive') return `HotIf WinActive("${cond}")\n`;
    return `HotIf WinExist("${cond}")\n`;
  }
  // v1: Hotkey, IfWinActive/Exist is different syntax
  if (mode === 'WinActive') return `Hotkey, IfWinActive, ${cond}\n`;
  if (mode === 'WinExist') return `Hotkey, IfWinExist, ${cond}\n`;
  return `; HotIf condition not supported in v1 command syntax\n`;
};

// ============================================
// V2 INTROSPECTION GENERATORS
// ============================================

// Type()
Blockly.Ahk['ahk_type_fn'] = function (block) {
  const val = Blockly.Ahk.valueToCode(block, 'VALUE', Blockly.Ahk.ORDER_NONE) || '""';
  const v = block.getFieldValue('VAR');
  return `${v} := Type(${val})\n`;
};

// IsSet
Blockly.Ahk['ahk_isset'] = function (block) {
  const varname = block.getFieldValue('VARNAME');
  if (AHK_VERSION === 'v2') {
    return [`IsSet(${varname})`, Blockly.Ahk.ORDER_ATOMIC];
  }
  return [`${varname} != ""`, Blockly.Ahk.ORDER_RELATIONAL];
};

// StrCompare
Blockly.Ahk['ahk_strcompare'] = function (block) {
  const str1 = Blockly.Ahk.valueToCode(block, 'STR1', Blockly.Ahk.ORDER_NONE) || '""';
  const str2 = Blockly.Ahk.valueToCode(block, 'STR2', Blockly.Ahk.ORDER_NONE) || '""';
  const caseSense = block.getFieldValue('CASESENSE');
  const v = block.getFieldValue('VAR');
  if (caseSense) return `${v} := StrCompare(${str1}, ${str2}, true)\n`;
  return `${v} := StrCompare(${str1}, ${str2})\n`;
};

// HasBase / HasMethod / HasProp
Blockly.Ahk['ahk_obj_inspect'] = function (block) {
  const fn = block.getFieldValue('FN');
  const name = block.getFieldValue('NAME');
  const obj = Blockly.Ahk.valueToCode(block, 'OBJ', Blockly.Ahk.ORDER_NONE) || '""';
  return [`${fn}(${obj}, "${name}")`, Blockly.Ahk.ORDER_ATOMIC];
};

// ============================================
// V2 StrSplit GENERATOR
// ============================================

Blockly.Ahk['ahk_strsplit_v2'] = function (block) {
  const str = Blockly.Ahk.valueToCode(block, 'STRING', Blockly.Ahk.ORDER_NONE) || '""';
  const delimiters = block.getFieldValue('DELIMITERS');
  const omitChars = block.getFieldValue('OMITCHARS');
  const v = block.getFieldValue('VAR');
  if (omitChars) return `${v} := StrSplit(${str}, "${delimiters}", "${omitChars}")\n`;
  return `${v} := StrSplit(${str}, "${delimiters}")\n`;
};

// ============================================
// V2 Buffer GENERATOR
// ============================================

Blockly.Ahk['ahk_buffer'] = function (block) {
  const size = block.getFieldValue('SIZE');
  const fill = block.getFieldValue('FILL');
  const v = block.getFieldValue('VAR');
  if (fill > 0) return `${v} := Buffer(${size}, ${fill})\n`;
  return `${v} := Buffer(${size})\n`;
};

// ============================================
// COM EXTENDED GENERATORS
// ============================================

// ComCall
Blockly.Ahk['ahk_com_call'] = function (block) {
  const index = block.getFieldValue('INDEX');
  const obj = block.getFieldValue('OBJ');
  const argTypes = block.getFieldValue('ARGTYPES');
  const retType = block.getFieldValue('RETURNTYPE');
  const arg1 = block.getFieldValue('ARG1');
  const v = block.getFieldValue('VAR');
  const types = argTypes.split(' ').filter(t => t.trim());
  // ComCall(Index, ComObj, ParamType1, Param1, ParamType2, Param2, ReturnType)
  const parts = [`${index}`, obj];
  for (let i = 0; i < types.length; i++) {
    parts.push(`"${types[i]}"`);
    parts.push(i === 0 ? arg1 : '0');
  }
  parts.push(`"${retType}"`);
  if (AHK_VERSION === 'v2') {
    return `${v} := ComCall(${parts.join(', ')})\n`;
  }
  return `${v} := ComCall(${parts.join(', ')})\n`;
};

// ComValue
Blockly.Ahk['ahk_com_value'] = function (block) {
  const vartype = block.getFieldValue('VARTYPE');
  const val = block.getFieldValue('VALUE');
  const v = block.getFieldValue('VAR');
  const vtMap = {
    'VT_I4': 3, 'VT_R8': 5, 'VT_BSTR': 8, 'VT_BOOL': 11,
    'VT_ARRAY': 0x2000, 'VT_DISPATCH': 9, 'VT_UNKNOWN': 13, 'VT_BYREF': 0x4000
  };
  const vtNum = vtMap[vartype] || 3;
  if (AHK_VERSION === 'v2') {
    return `${v} := ComValue(${vtNum}, ${val})\n`;
  }
  return `${v} := ComValue(${vtNum}, ${val})\n`;
};

// ============================================
// V2 DIR OPS GENERATOR
// ============================================

Blockly.Ahk['ahk_dir_v2'] = function (block) {
  const action = block.getFieldValue('ACTION');
  const source = block.getFieldValue('SOURCE');
  const dest = block.getFieldValue('DEST');
  const recurse = block.getFieldValue('RECURSE');
  const overwrite = block.getFieldValue('OVERWRITE');
  
  if (AHK_VERSION === 'v2') {
    if (action === 'DirCreate') return `DirCreate("${source}")\n`;
    if (action === 'DirDelete') return `DirDelete("${source}", ${recurse ? 1 : 0})\n`;
    if (action === 'DirCopy') return `DirCopy("${source}", "${dest}", ${overwrite ? 1 : 0})\n`;
    if (action === 'DirMove') return `DirMove("${source}", "${dest}", ${overwrite ? 1 : 0})\n`;
  }
  // v1 fallbacks
  if (action === 'DirCreate') return `FileCreateDir, ${source}\n`;
  if (action === 'DirDelete') return `FileRemoveDir, ${source}, ${recurse ? 1 : 0}\n`;
  if (action === 'DirCopy') return `FileCopyDir, ${source}, ${dest}, ${overwrite ? 1 : 0}\n`;
  if (action === 'DirMove') return `FileMoveDir, ${source}, ${dest}, ${overwrite ? 1 : 0}\n`;
  return '';
};

// ============================================
// SYSTEM TIMING GENERATOR
// ============================================

Blockly.Ahk['ahk_set_sys_delay'] = function (block) {
  const cmd = block.getFieldValue('CMD');
  const value = block.getFieldValue('VALUE');
  const mode = block.getFieldValue('MODE');
  if (cmd === 'SetStoreCapslockMode') {
    const modeVal = mode === 'on' ? 'On' : mode === 'off' ? 'Off' : 'On';
    return `SetStoreCapslockMode, ${modeVal}\n`;
  }
  if (AHK_VERSION === 'v2') {
    return `${cmd}(${value})\n`;
  }
  return `${cmd}, ${value}\n`;
};

// ============================================
// DRIVE GENERATOR
// ============================================

Blockly.Ahk['ahk_drive'] = function (block) {
  const action = block.getFieldValue('ACTION');
  const v = block.getFieldValue('VAR');
  const sub = block.getFieldValue('SUBCOMMAND');
  const drive = block.getFieldValue('DRIVE');
  if (action === 'DriveSpaceFree') return `DriveSpaceFree, ${v}, ${drive}\n`;
  if (action === 'Drive') return `Drive, ${sub}, ${drive}\n`;
  return `DriveGet, ${v}, ${sub}, ${drive}\n`;
};

// ============================================
// FILE ENCODING / ENVUPDATE GENERATOR
// ============================================

Blockly.Ahk['ahk_file_encoding'] = function (block) {
  const encoding = block.getFieldValue('ENCODING');
  return `FileEncoding, ${encoding}\n`;
};

Blockly.Ahk['ahk_env_update'] = function (block) {
  return `EnvUpdate\n`;
};

// ============================================
// V1 STRING LOWER/UPPER GENERATOR
// ============================================

Blockly.Ahk['ahk_string_case_v1'] = function (block) {
  const action = block.getFieldValue('ACTION');
  const out = block.getFieldValue('OUTVAR');
  const inv = block.getFieldValue('INVAR');
  const flag = block.getFieldValue('FLAG');
  const cmd = action === 'L' ? 'StringLower' : 'StringUpper';
  if (flag) return `${cmd}, ${out}, ${inv}, ${flag}\n`;
  return `${cmd}, ${out}, ${inv}\n`;
};

// ============================================
// ATAN2 GENERATOR
// ============================================

Blockly.Ahk['ahk_atan2'] = function (block) {
  const y = block.getFieldValue('Y');
  const x = block.getFieldValue('X');
  const v = block.getFieldValue('VAR');
  return `${v} := ATan2(${y}, ${x})\n`;
};

// ============================================
// ONCLIPBOARDCHANGE GENERATOR
// ============================================

Blockly.Ahk['ahk_on_clipboard_change'] = function (block) {
  const action = block.getFieldValue('ACTION');
  const func = block.getFieldValue('FUNC');
  if (action === 'Off') return `OnClipboardChange("${func}", 0)\n`;
  return `OnClipboardChange("${func}")\n`;
};

// ============================================
// FUNCTION META GENERATORS
// ============================================

// IsLabel / IsFunc / Func
Blockly.Ahk['ahk_func_meta'] = function (block) {
  const fn = block.getFieldValue('FN');
  const name = block.getFieldValue('NAME');
  const v = block.getFieldValue('VAR');
  return `${v} := ${fn}("${name}")\n`;
};

// CallbackCreate
Blockly.Ahk['ahk_callback_create'] = function (block) {
  const func = block.getFieldValue('FUNCTION');
  const paramCount = block.getFieldValue('PARAMCOUNT');
  const v = block.getFieldValue('VAR');
  return `${v} := CallbackCreate("${func}", , ${paramCount})\n`;
};

// ============================================
// SCRUB — follow the next block chain
// ============================================

Blockly.Ahk.scrub_ = function (block, code, thisOnly) {
  // Follow the next block in the chain (vertical connection)
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  if (nextBlock && !thisOnly) {
    code += this.blockToCode(nextBlock, thisOnly);
  }
  return code;
};

// ============================================
// GENERATOR FINISH HOOK
// ============================================

Blockly.Ahk.finish = function (code) {
  if (!code || code.trim() === '') {
    return '; Drag blocks from the toolbox to start building your AHK script!\n';
  }

  if (AHK_VERSION === 'v2') {
    const header = [
      '; ============================================',
      '; Generated by AHK Builder (AHK v2)',
      '; ============================================',
      '#Requires AutoHotkey v2.0',
      '#Warn',
      '',
      '',
    ].join('\n');
    return header + code;
  }

  const header = [
    '; ============================================',
    '; Generated by AHK Builder (AHK v1)',
    '; ============================================',
    '#NoEnv',
    '#Warn',
    'SendMode Input',
    'SetWorkingDir %A_ScriptDir%',
    '',
    '',
  ].join('\n');
  return header + code;
};

// ============================================
// SYNTAX HIGHLIGHTING
// ============================================

function highlightAhkCode(code) {
  let html = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Highlight comments
  html = html.replace(/(;.*)/g, '<span class="ahk-comment">$1</span>');

  // Highlight AHK commands (v1 and v2)
  const commands = [
    'MouseClick', 'MouseMove', 'MouseClickDrag', 'MouseGetPos',
    'Click', 'Send', 'SendInput', 'SendText', 'SendEvent', 'SendPlay',
    'KeyWait', 'WinActivate', 'WinActivateBottom', 'WinClose', 'WinKill',
    'WinMinimize', 'WinMaximize', 'WinRestore', 'WinMove',
    'WinWait', 'WinWaitActive', 'WinWaitClose', 'WinWaitNotActive',
    'WinGetActiveTitle', 'WinGetTitle', 'WinGetClass', 'WinGet',
    'WinSet', 'WinSetTitle', 'WinHide', 'WinShow',
    'WinSetAlwaysOnTop', 'WinGetPos', 'WinGetText', 'WinExist', 'WinActive',
    'WinGetID', 'WinGetIDLast', 'WinGetList', 'WinGetCount',
    'WinMinimizeAll', 'WinMinimizeAllUndo', 'WinRedraw',
    'Loop', 'While', 'Until', 'For', 'Sleep', 'Run',
    'RunWait', 'FileAppend', 'FileRead', 'FileReadLine', 'FileDelete',
    'FileCopy', 'FileMove', 'FileExist', 'FileGetSize', 'FileGetTime',
    'FileSetTime', 'FileGetAttrib', 'FileSetAttrib', 'FileGetVersion',
    'FileRecycle', 'FileRecycleEmpty', 'FileCreateDir', 'FileRemoveDir',
    'FileCopyDir', 'FileMoveDir', 'FileSelectFile', 'FileSelectFolder',
    'FileCreateShortcut', 'FileGetShortcut',
    'SplitPath', 'MsgBox', 'InputBox', 'ToolTip',
    'SplashTextOn', 'SplashTextOff', 'SplashImage', 'Progress',
    'ExitApp', 'Exit', 'Reload',
    'Clipboard', 'A_Clipboard', 'ClipWait', 'OnClipboardChange',
    'PixelGetColor', 'PixelSearch', 'ImageSearch',
    'MailSend', 'SoundBeep', 'SoundPlay', 'SoundGet', 'SoundSet',
    'SoundGetWaveVolume', 'SoundSetWaveVolume',
    'If', 'Else', 'Return', 'SetWorkingDir', 'SendMode',
    '#NoEnv', '#Warn', '#Persistent', '#SingleInstance', '#Requires',
    '#NoTrayIcon', '#InstallKeybdHook', '#InstallMouseHook', '#UseHook',
    '#WinActivateForce', '#MaxThreads', '#MaxHotkeysPerInterval',
    '#HotkeyInterval', '#ClipboardTimeout', '#ErrorStdOut', '#MaxMem',
    'Break', 'Continue', 'Goto', 'Gosub', 'Hotkey', 'Hotstring',
    'A_TickCount', 'A_Index', 'A_ScriptDir', 'A_WorkingDir',
    'A_LoopFileName', 'A_LoopFileFullPath', 'A_LoopFileDir',
    'A_LoopFileExt', 'A_LoopFileSize', 'A_LoopFileTimeModified',
    'A_LoopReadLine', 'A_LoopField', 'A_LoopRegKey', 'A_LoopRegName',
    'WinGetActiveStats', 'WinGetClass',
    'Try', 'Catch', 'Finally', 'Throw',
    'StringLen', 'StringMid', 'StringSplit', 'StringReplace',
    'StringTrimLeft', 'StringTrimRight', 'StringGetPos',
    'StringLower', 'StringUpper', 'StringCaseSense',
    'RegExMatch', 'RegExReplace',
    'Chr', 'Ord', 'Asc', 'SubStr', 'StrLen', 'StrReplace',
    'InStr', 'Trim', 'LTrim', 'RTrim', 'StrSplit',
    'StrLower', 'StrUpper', 'Format',
    'IniRead', 'IniWrite', 'IniDelete',
    'RegRead', 'RegWrite', 'RegDelete',
    'ControlClick', 'ControlFocus', 'ControlGetFocus',
    'ControlGetText', 'ControlSetText', 'ControlGetPos',
    'ControlMove', 'ControlSend', 'ControlSendRaw',
    'ControlGet', 'Control',
    'PostMessage', 'SendMessage',
    'StatusBarGetText', 'StatusBarWait',
    'SetTitleMatchMode', 'SetKeyDelay', 'SetMouseDelay',
    'SetDefaultMouseSpeed', 'SetCapsLockState',
    'SetNumLockState', 'SetScrollLockState',
    'SendInput', 'SendEvent', 'SendPlay',
    'BlockInput', 'SendLevel', 'CoordMode',
    'DllCall', 'ComObjCreate', 'ComObject', 'ComCall', 'ComObjActive',
    'ComObjGet', 'ComObjConnect', 'ComObjArray', 'ComObjValue',
    'NumGet', 'NumPut', 'StrGet', 'StrPut',
    'VarSetCapacity', 'VarSetStrCapacity',
    'CallbackCreate', 'CallbackFree',
    'IsLabel', 'IsFunc', 'IsObject', 'Func', 'ObjBindMethod',
    'Abs', 'Ceil', 'Floor', 'Round', 'Sqrt',
    'Sin', 'Cos', 'Tan', 'ASin', 'ACos', 'ATan', 'ATan2',
    'Log', 'Ln', 'Exp', 'Mod', 'Max', 'Min', 'Random',
    'EnvGet', 'EnvSet', 'EnvAdd', 'EnvSub', 'EnvUpdate',
    'FormatTime', 'DateAdd', 'DateDiff',
    'SysGet', 'Process', 'ProcessClose', 'ProcessWait',
    'ProcessExist', 'ProcessWaitClose', 'ProcessSetPriority',
    'Pause', 'Suspend', 'Critical', 'Thread',
    'ListVars', 'ListLines', 'ListHotkeys', 'KeyHistory', 'OutputDebug',
    'SetTimer', 'Hotkey', 'InputHook',
    'UrlDownloadToFile', 'Download',
    'SetBatchLines', 'SetEnv',
    'String', 'Integer', 'Float', 'Number', 'Type',
    'IsNumber', 'IsInteger', 'IsFloat', 'IsAlpha', 'IsAlnum',
    'IsDigit', 'IsUpper', 'IsLower', 'IsSpace', 'IsXDigit',
    'HasBase', 'HasMethod', 'HasProp',
    'Gui', 'GuiControl', 'GuiControlGet',
    'Array', 'Map', 'Object', 'Buffer',
    'TrayTip', 'SplashTextOn', 'SplashTextOff',
    'SetWorkingDir', 'SendMode',
  ];

  // Add A_* special variables to highlighting
  html = html.replace(/(A_[A-Za-z_][A-Za-z0-9_]*)/g, '<span class="ahk-command">$1</span>');

  const cmdPattern = new RegExp('\\b(' + commands.join('|') + ')\\b', 'g');
  html = html.replace(cmdPattern, '<span class="ahk-command">$1</span>');

  // Highlight numbers
  html = html.replace(/\b(\d+)\b/g, '<span class="ahk-number">$1</span>');

  // Highlight strings (text in quotes)
  html = html.replace(/(&quot;.*?&quot;|".*?")/g, '<span class="ahk-string">$1</span>');

  // Highlight variables in v1 style (%var%)
  html = html.replace(/(%[A-Za-z_][A-Za-z0-9_]*%)/g, '<span class="ahk-variable">$1</span>');

  // Highlight ByRef parameters in v2 (&var)
  html = html.replace(/(&[A-Za-z_][A-Za-z0-9_]*)/g, '<span class="ahk-variable">$1</span>');

  // Highlight hotkey definitions
  html = html.replace(/^([\^!+#]*[A-Za-z0-9]+\s*::)/gm, '<span class="ahk-hotkey">$1</span>');

  return html;
}
