// ============================================
// AHK Builder - Extended Block Definitions
// Covers: String, Math, Date/Time, Registry/INI,
// Control, System, Object, RawCode, FunctionCall
// ============================================

// ============================================
// "ANY CODE" BLOCK — type raw AHK
// ============================================
Blockly.Blocks['ahk_raw_code'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('⚡ raw code');
    this.appendValueInput('CODE')
      .setCheck('String');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#607D8B');
    this.setTooltip('Type any AHK code directly. Use this when no block exists for what you need.');
  }
};

// Raw code variant with a big text area
Blockly.Blocks['ahk_raw_code_multi'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('⚡ raw code (multi-line)');
    this.appendDummyInput()
      .appendField(new Blockly.FieldMultilineInput('; Your code here\nMsgBox "Hello"'), 'CODE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#607D8B');
    this.setTooltip('Write multiple lines of raw AHK code.');
  }
};

// ============================================
// FUNCTION CALL BLOCK
// ============================================
Blockly.Blocks['ahk_function_call'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('📞 call')
      .appendField(new Blockly.FieldTextInput('MyFunction'), 'FUNC')
      .appendField('(');
    this.appendValueInput('ARG1')
      .setCheck(null)
      .setAlign('RIGHT');
    this.appendDummyInput()
      .appendField(',');
    this.appendValueInput('ARG2')
      .setCheck(null)
      .setAlign('RIGHT');
    this.appendDummyInput()
      .appendField(',');
    this.appendValueInput('ARG3')
      .setCheck(null)
      .setAlign('RIGHT');
    this.appendDummyInput()
      .appendField(')');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#9E9E9E');
    this.setTooltip('Call any AHK function with up to 3 arguments.');
  }
};

Blockly.Blocks['ahk_function_call_expr'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('MyFunction'), 'FUNC')
      .appendField('(');
    this.appendValueInput('ARG1')
      .setCheck(null)
      .setAlign('RIGHT');
    this.appendDummyInput()
      .appendField(')');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour('#9E9E9E');
    this.setTooltip('Call any function and get its return value.');
  }
};

// ============================================
// STRING CATEGORY (#00897B)
// ============================================

Blockly.Blocks['ahk_strlen'] = {
  init: function () {
    this.appendValueInput('STRING').setCheck('String').appendField('length of');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Len'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('Get the number of characters in a string.');
  }
};

Blockly.Blocks['ahk_substr'] = {
  init: function () {
    this.appendValueInput('STRING').setCheck('String').appendField('substring of');
    this.appendDummyInput()
      .appendField('start:')
      .appendField(new Blockly.FieldNumber(1), 'START')
      .appendField('length:')
      .appendField(new Blockly.FieldNumber(0, 0), 'LENGTH');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Result'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('Extract a substring from a string.');
  }
};

Blockly.Blocks['ahk_strreplace'] = {
  init: function () {
    this.appendValueInput('STRING').setCheck('String').appendField('replace in');
    this.appendDummyInput()
      .appendField('find:')
      .appendField(new Blockly.FieldTextInput('old'), 'SEARCH')
      .appendField('replace:')
      .appendField(new Blockly.FieldTextInput('new'), 'REPLACE');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Result'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('Replace occurrences of text in a string.');
  }
};

Blockly.Blocks['ahk_instr'] = {
  init: function () {
    this.appendValueInput('HAYSTACK').setCheck('String').appendField('find')
      .appendField(new Blockly.FieldTextInput('needle'), 'NEEDLE');
    this.appendDummyInput()
      .appendField('in (case sensitive:)')
      .appendField(new Blockly.FieldCheckbox(false), 'CASESENSE');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('FoundPos'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('Search for text within another string. Returns position (0 = not found).');
  }
};

Blockly.Blocks['ahk_strcase'] = {
  init: function () {
    this.appendValueInput('STRING').setCheck('String').appendField('convert')
      .appendField(new Blockly.FieldDropdown([['to UPPER', 'Upper'], ['to lower', 'Lower'], ['to Title', 'Title']]), 'CASE');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Result'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('Convert a string to upper case, lower case, or title case.');
  }
};

Blockly.Blocks['ahk_trim'] = {
  init: function () {
    this.appendValueInput('STRING').setCheck('String').appendField('trim')
      .appendField(new Blockly.FieldDropdown([['both sides', 'Trim'], ['left', 'LTrim'], ['right', 'RTrim']]), 'MODE');
    this.appendDummyInput()
      .appendField('chars:')
      .appendField(new Blockly.FieldTextInput(''), 'CHARS');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Result'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('Trim whitespace (or specific characters) from a string.');
  }
};

Blockly.Blocks['ahk_format'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('format')
      .appendField(new Blockly.FieldTextInput('Hello %s!'), 'FMT');
    this.appendDummyInput()
      .appendField('value1:')
      .appendField(new Blockly.FieldTextInput('World'), 'VAL1');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Result'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('Format a string. Use %s for strings, %d for numbers.');
  }
};

// ============================================
// MATH CATEGORY (#1E88E5)
// ============================================

Blockly.Blocks['ahk_math_func'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('math')
      .appendField(new Blockly.FieldDropdown([
        ['abs (|x|)', 'Abs'],
        ['round', 'Round'],
        ['floor ⌊x⌋', 'Floor'],
        ['ceil ⌈x⌉', 'Ceil'],
        ['sqrt √', 'Sqrt'],
        ['square (x²)', 'Sqr'],
        ['log₁₀', 'Log'],
        ['ln (natural)', 'Ln'],
        ['exp (eˣ)', 'Exp'],
        ['sin', 'Sin'],
        ['cos', 'Cos'],
        ['tan', 'Tan'],
      ]), 'FN');
    this.appendValueInput('X').setCheck('Number').appendField('of');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Result'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#1E88E5');
    this.setTooltip('Perform a math function on a value.');
  }
};

Blockly.Blocks['ahk_minmax'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['min', 'Min'], ['max', 'Max']]), 'FN')
      .appendField('of');
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumber(0), 'A')
      .appendField('and')
      .appendField(new Blockly.FieldNumber(0), 'B');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Result'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#1E88E5');
    this.setTooltip('Get the minimum or maximum of two numbers.');
  }
};

Blockly.Blocks['ahk_round'] = {
  init: function () {
    this.appendValueInput('NUM').setCheck('Number').appendField('round');
    this.appendDummyInput()
      .appendField('to')
      .appendField(new Blockly.FieldNumber(0, 0, 99), 'DECIMALS')
      .appendField('decimals');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Result'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#1E88E5');
    this.setTooltip('Round a number to N decimal places.');
  }
};

// ============================================
// DATE/TIME CATEGORY (#00897B)
// ============================================

Blockly.Blocks['ahk_format_time'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('format time')
      .appendField(new Blockly.FieldTextInput('yyyy-MM-dd HH:mm:ss'), 'FORMAT');
    this.appendDummyInput()
      .appendField('input (blank = now):')
      .appendField(new Blockly.FieldTextInput(''), 'INPUT');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Formatted'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('Format a date/time. Use yyyy=year, MM=month, dd=day, HH=hour, mm=minute, ss=second.');
  }
};

Blockly.Blocks['ahk_dateadd'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('add')
      .appendField(new Blockly.FieldNumber(7), 'AMOUNT')
      .appendField(new Blockly.FieldDropdown([['days', 'Days'], ['hours', 'Hours'], ['minutes', 'Minutes'], ['seconds', 'Seconds']]), 'UNITS');
    this.appendDummyInput()
      .appendField('to')
      .appendField(new Blockly.FieldTextInput(''), 'INPUT');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('NewDate'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('Add or subtract time from a date. Leave input blank to use current time.');
  }
};

Blockly.Blocks['ahk_datediff'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('difference between')
      .appendField(new Blockly.FieldTextInput(''), 'DATE1');
    this.appendDummyInput()
      .appendField('and')
      .appendField(new Blockly.FieldTextInput(''), 'DATE2');
    this.appendDummyInput()
      .appendField('in')
      .appendField(new Blockly.FieldDropdown([['seconds', 'Seconds'], ['minutes', 'Minutes'], ['hours', 'Hours'], ['days', 'Days']]), 'UNITS');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Diff'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('Get the difference between two dates. Use YYYYMMDDHH24MISS format. Leave blank for now.');
  }
};

// ============================================
// REGISTRY / INI CATEGORY (#795548)
// ============================================

Blockly.Blocks['ahk_reg_read'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('registry read')
      .appendField(new Blockly.FieldDropdown([['HKLM', 'HKLM'], ['HKCU', 'HKCU'], ['HKCR', 'HKCR'], ['HKCC', 'HKCC'], ['HKDD', 'HKDD']]), 'ROOT');
    this.appendDummyInput()
      .appendField('subkey:')
      .appendField(new Blockly.FieldTextInput('Software\\Microsoft\\Windows\\CurrentVersion'), 'SUBKEY');
    this.appendDummyInput()
      .appendField('value:')
      .appendField(new Blockly.FieldTextInput('ProgramFilesDir'), 'VALNAME');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('RegValue'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#795548');
    this.setTooltip('Read a value from the Windows Registry.');
  }
};

Blockly.Blocks['ahk_reg_write'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('registry write')
      .appendField(new Blockly.FieldDropdown([['HKLM', 'HKLM'], ['HKCU', 'HKCU']]), 'ROOT');
    this.appendDummyInput()
      .appendField('subkey:')
      .appendField(new Blockly.FieldTextInput('Software\\MyApp'), 'SUBKEY');
    this.appendDummyInput()
      .appendField('value:')
      .appendField(new Blockly.FieldTextInput('MyValue'), 'VALNAME')
      .appendField('=')
      .appendField(new Blockly.FieldTextInput('data'), 'VALUE');
    this.appendDummyInput()
      .appendField('type:')
      .appendField(new Blockly.FieldDropdown([['REG_SZ', 'REG_SZ'], ['REG_DWORD', 'REG_DWORD'], ['REG_BINARY', 'REG_BINARY'], ['REG_MULTI_SZ', 'REG_MULTI_SZ']]), 'TYPE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#795548');
    this.setTooltip('Write a value to the Windows Registry.');
  }
};

Blockly.Blocks['ahk_ini_read'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('ini read')
      .appendField(new Blockly.FieldTextInput('C:\\config.ini'), 'FILE');
    this.appendDummyInput()
      .appendField('section:')
      .appendField(new Blockly.FieldTextInput('Settings'), 'SECTION')
      .appendField('key:')
      .appendField(new Blockly.FieldTextInput('KeyName'), 'KEY');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('IniValue'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#795548');
    this.setTooltip('Read a value from an INI file.');
  }
};

Blockly.Blocks['ahk_ini_write'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('ini write')
      .appendField(new Blockly.FieldTextInput('C:\\config.ini'), 'FILE');
    this.appendDummyInput()
      .appendField('section:')
      .appendField(new Blockly.FieldTextInput('Settings'), 'SECTION')
      .appendField('key:')
      .appendField(new Blockly.FieldTextInput('KeyName'), 'KEY');
    this.appendDummyInput()
      .appendField('value:')
      .appendField(new Blockly.FieldTextInput('value'), 'VALUE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#795548');
    this.setTooltip('Write a value to an INI file.');
  }
};

// ============================================
// FILE EXTENDED CATEGORY (#6D4C41)
// ============================================

Blockly.Blocks['ahk_file_move'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('move file')
      .appendField(new Blockly.FieldTextInput('C:\\src.txt'), 'SOURCE');
    this.appendDummyInput()
      .appendField('to')
      .appendField(new Blockly.FieldTextInput('C:\\dst.txt'), 'DEST')
      .appendField('overwrite:')
      .appendField(new Blockly.FieldCheckbox(true), 'OVERWRITE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#6D4C41');
    this.setTooltip('Move or rename a file.');
  }
};

Blockly.Blocks['ahk_file_exist'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('file exists?')
      .appendField(new Blockly.FieldTextInput('C:\\Windows\\notepad.exe'), 'PATH');
    this.setOutput(true, null);
    this.setColour('#6D4C41');
    this.setTooltip('Check if a file or directory exists. Returns the attributes string or empty.');
  }
};

Blockly.Blocks['ahk_split_path'] = {
  init: function () {
    this.appendValueInput('PATH').setCheck('String').appendField('split path');
    this.appendDummyInput()
      .appendField('→ name:')
      .appendField(new Blockly.FieldTextInput('FileName'), 'VARNAME');
    this.appendDummyInput()
      .appendField('dir:')
      .appendField(new Blockly.FieldTextInput('FileDir'), 'VARDIR')
      .appendField('ext:')
      .appendField(new Blockly.FieldTextInput('FileExt'), 'VAREXT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#6D4C41');
    this.setTooltip('Split a file path into name, directory, and extension.');
  }
};

Blockly.Blocks['ahk_dir_create'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('create directory')
      .appendField(new Blockly.FieldTextInput('C:\\NewFolder'), 'DIR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#6D4C41');
    this.setTooltip('Create a directory (and parent directories if needed).');
  }
};

// ============================================
// CONTROL CATEGORY (#F9A825)
// ============================================

Blockly.Blocks['ahk_control_click'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('control click')
      .appendField(new Blockly.FieldTextInput('Button1'), 'CONTROL');
    this.appendDummyInput()
      .appendField('on window')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Click a control in a window. Use \"A\" for active window.');
  }
};

Blockly.Blocks['ahk_control_get_text'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('get control text')
      .appendField(new Blockly.FieldTextInput('Edit1'), 'CONTROL');
    this.appendDummyInput()
      .appendField('on window')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('CtrlText'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Get the text from a control (text box, label, etc.).');
  }
};

Blockly.Blocks['ahk_control_send'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('control send')
      .appendField(new Blockly.FieldTextInput('Edit1'), 'CONTROL');
    this.appendDummyInput()
      .appendField('keys:')
      .appendField(new Blockly.FieldTextInput('Hello'), 'KEYS');
    this.appendDummyInput()
      .appendField('on window')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Send keystrokes directly to a control.');
  }
};

Blockly.Blocks['ahk_control_set_text'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('set control text')
      .appendField(new Blockly.FieldTextInput('Edit1'), 'CONTROL');
    this.appendDummyInput()
      .appendField('to:')
      .appendField(new Blockly.FieldTextInput('New text'), 'TEXT');
    this.appendDummyInput()
      .appendField('on window')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Set the text of a control.');
  }
};

// ============================================
// SYSTEM CATEGORY (#EC407A)
// ============================================

Blockly.Blocks['ahk_set_timer'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('set timer')
      .appendField(new Blockly.FieldTextInput('MyLabel'), 'LABEL')
      .appendField('every')
      .appendField(new Blockly.FieldNumber(1000), 'MS')
      .appendField('ms');
    this.appendDummyInput()
      .appendField('priority:')
      .appendField(new Blockly.FieldDropdown([['normal (0)', '0'], ['high (1)', '1'], ['low (-1)', '-1']]), 'PRIORITY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Run a subroutine/label at regular intervals. Set ms=0 to disable.');
  }
};

Blockly.Blocks['ahk_get_key_state'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('key state')
      .appendField(new Blockly.FieldTextInput('CapsLock'), 'KEY')
      .appendField(new Blockly.FieldDropdown([['is down/pressed?', 'down'], ['is toggled on?', 'toggled']]), 'MODE');
    this.setOutput(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Check if a key is currently pressed or toggled on.');
  }
};

Blockly.Blocks['ahk_set_capslock'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('set')
      .appendField(new Blockly.FieldDropdown([['CapsLock', 'CapsLock'], ['NumLock', 'NumLock'], ['ScrollLock', 'ScrollLock']]), 'KEY')
      .appendField(new Blockly.FieldDropdown([['on', 'On'], ['off', 'Off'], ['always on', 'AlwaysOn'], ['always off', 'AlwaysOff']]), 'STATE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Set the state of CapsLock, NumLock, or ScrollLock.');
  }
};

Blockly.Blocks['ahk_coord_mode'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('coordinate mode')
      .appendField(new Blockly.FieldDropdown([['Mouse', 'Mouse'], ['Pixel', 'Pixel'], ['ToolTip', 'ToolTip'], ['Caret', 'Caret']]), 'TARGET');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldDropdown([['Screen', 'Screen'], ['Window', 'Window'], ['Client', 'Client']]), 'MODE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Set coordinate mode for mouse, pixel, tooltip, or caret operations.');
  }
};

Blockly.Blocks['ahk_dll_call'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('DllCall')
      .appendField(new Blockly.FieldTextInput('user32\MessageBox'), 'FUNC');
    this.appendDummyInput()
      .appendField('arg types:')
      .appendField(new Blockly.FieldTextInput('Ptr Str UInt', 'Ptr'), 'TYPES')
      .appendField('return:')
      .appendField(new Blockly.FieldTextInput('Int'), 'RETURNTYPE');
    this.appendDummyInput()
      .appendField('arg1:')
      .appendField(new Blockly.FieldTextInput('0'), 'ARG1');
    this.appendDummyInput()
      .appendField('arg2:')
      .appendField(new Blockly.FieldTextInput('Hello'), 'ARG2');
    this.appendDummyInput()
      .appendField('arg3:')
      .appendField(new Blockly.FieldTextInput('0'), 'ARG3');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('DllResult'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Call a native DLL function. Example: user32\MessageBox with args 0, \"text\", \"title\", 0');
  }
};

Blockly.Blocks['ahk_com_object'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('COM object')
      .appendField(new Blockly.FieldTextInput('Excel.Application'), 'CLASS');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('ComObj'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Create a COM object (e.g., Excel.Application, Word.Application, InternetExplorer.Application).');
  }
};

Blockly.Blocks['ahk_download'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('download')
      .appendField(new Blockly.FieldTextInput('https://example.com/file.zip'), 'URL');
    this.appendDummyInput()
      .appendField('to')
      .appendField(new Blockly.FieldTextInput('C:\\file.zip'), 'FILE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Download a file from the internet.');
  }
};

// ============================================
// BOOLEAN / CONSTANTS CATEGORY (#78909C)
// ============================================

Blockly.Blocks['ahk_boolean'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['true', 'true'], ['false', 'false'], ['null', 'null'], ['empty string', '\"\"']]), 'VALUE');
    this.setOutput(true, null);
    this.setColour('#78909C');
    this.setTooltip('A constant value: true, false, null, or empty string.');
  }
};

Blockly.Blocks['ahk_type_check'] = {
  init: function () {
    this.appendValueInput('VALUE').appendField('is')
      .appendField(new Blockly.FieldDropdown([
        ['a number?', 'IsNumber'],
        ['an integer?', 'IsInteger'],
        ['a float?', 'IsFloat'],
        ['an object?', 'IsObject'],
        ['a string?', 'IsString'],
        ['a label?', 'IsLabel'],
      ]), 'CHECK');
    this.setOutput(true, null);
    this.setColour('#78909C');
    this.setTooltip('Check the type of a value. Only works in AHK v2 for IsNumber/IsInteger/IsFloat.');
  }
};

// ============================================
// OBJECT CATEGORY (#7C4DFF)
// ============================================

Blockly.Blocks['ahk_array'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('array [')
      .appendField(new Blockly.FieldTextInput('item1, item2, item3'), 'ITEMS')
      .appendField(']');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('MyArray'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#7C4DFF');
    this.setTooltip('Create an array with comma-separated values. Only works in AHK v2.');
  }
};

Blockly.Blocks['ahk_map'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('map {')
      .appendField(new Blockly.FieldTextInput('key1,val1, key2,val2'), 'PAIRS')
      .appendField('}');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('MyMap'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#7C4DFF');
    this.setTooltip('Create a map with key=value pairs. Pairs as: key1,val1, key2,val2. Only works in AHK v2.');
  }
};

Blockly.Blocks['ahk_object'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('object {')
      .appendField(new Blockly.FieldTextInput('key1,val1, key2,val2'), 'PROPS')
      .appendField('}');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('MyObj'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#7C4DFF');
    this.setTooltip('Create an object with key=value properties. Only works in AHK v2.');
  }
};

// ============================================
// PIXEL / SCREEN CATEGORY (#00BCD4)
// ============================================

Blockly.Blocks['ahk_pixel_get_color'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('get pixel color at x:')
      .appendField(new Blockly.FieldNumber(0), 'X')
      .appendField('y:')
      .appendField(new Blockly.FieldNumber(0), 'Y');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('PixelColor'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00BCD4');
    this.setTooltip('Get the color of a pixel at screen coordinates. Returns hex color string.');
  }
};

// ============================================
// WINDOW EXTENDED CATEGORY (#F9A825)
// ============================================

Blockly.Blocks['ahk_win_set_title'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('rename window')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.appendDummyInput()
      .appendField('new title:')
      .appendField(new Blockly.FieldTextInput('My New Title'), 'NEWTITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Change the title of a window.');
  }
};

Blockly.Blocks['ahk_win_hide'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('hide window')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Hide a window.');
  }
};

Blockly.Blocks['ahk_win_show'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('show window')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Show a hidden window.');
  }
};

Blockly.Blocks['ahk_win_set_always_on_top'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('window')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.appendDummyInput()
      .appendField('always on top:')
      .appendField(new Blockly.FieldDropdown([['on', 'On'], ['off', 'Off'], ['toggle', 'Toggle']]), 'STATE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Set a window to be always on top.');
  }
};

Blockly.Blocks['ahk_win_get_class'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('get window class')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('WinClass'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Get the class name of a window.');
  }
};

Blockly.Blocks['ahk_win_get_id'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('get window HWND')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('WinHwnd'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Get the unique HWND identifier of a window.');
  }
};

// ============================================
// SOUND EXTENDED CATEGORY (#FF6F00)
// ============================================

Blockly.Blocks['ahk_sound_volume'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('sound')
      .appendField(new Blockly.FieldDropdown([['get volume', 'get'], ['set volume', 'set'], ['get mute', 'getmute'], ['set mute', 'setmute']]), 'ACTION');
    this.appendDummyInput()
      .appendField(new Blockly.FieldNumber(50, 0, 100), 'VALUE')
      .appendField('%');
    this.appendDummyInput()
      .appendField(' device:')
      .appendField(new Blockly.FieldNumber(1, 1, 10), 'DEVICE');
    this.appendDummyInput()
      .appendField('component:')
      .appendField(new Blockly.FieldDropdown([['master', 'MASTER'], ['microphone', 'MICROPHONE'], ['wave', 'WAVE'], ['synth', 'SYNTH'], ['cd', 'CD'], ['line in', 'LINE IN']]), 'COMPONENT');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('SoundVal'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#FF6F00');
    this.setTooltip('Get or set the system sound volume/mute.');
  }
};

// ============================================
// MISC CATEGORY (#78909C)
// ============================================

Blockly.Blocks['ahk_tray_tip'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('tray notification');
    this.appendDummyInput()
      .appendField('title:')
      .appendField(new Blockly.FieldTextInput('AHK Builder'), 'TITLE');
    this.appendDummyInput()
      .appendField('text:')
      .appendField(new Blockly.FieldTextInput('Hello!'), 'TEXT');
    this.appendDummyInput()
      .appendField('timeout:')
      .appendField(new Blockly.FieldNumber(3, 0), 'TIMEOUT')
      .appendField('s');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#78909C');
    this.setTooltip('Show a notification in the system tray.');
  }
};

Blockly.Blocks['ahk_clip_wait'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('wait for clipboard')
      .appendField(new Blockly.FieldDropdown([['any data', 'AnyData'], ['text', 'Text']]), 'CONTENT');
    this.appendDummyInput()
      .appendField('timeout:')
      .appendField(new Blockly.FieldNumber(2, 0), 'TIMEOUT')
      .appendField('s');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E53935');
    this.setTooltip('Wait for data to appear on the clipboard.');
  }
};

Blockly.Blocks['ahk_suspend'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('suspend hotkeys')
      .appendField(new Blockly.FieldDropdown([['toggle', 'Toggle'], ['on', 'On'], ['off', 'Off']]), 'MODE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Suspend or resume all hotkeys.');
  }
};
