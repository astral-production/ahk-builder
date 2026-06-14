// ============================================
// AHK Builder - v1-Specific Block Definitions
// Covers: String v1, Loop variants, File extended,
// Window extended, Control extended, System extended,
// Directives, Dialog, GUI, Sound extended, Registry, INI
// ============================================

// ============================================
// STRING v1-SPECIFIC COMMANDS (#00897B)
// ============================================

// StringLen (v1 command style)
Blockly.Blocks['ahk_strlen_v1'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('StringLen')
      .appendField(new Blockly.FieldTextInput('OutputVar'), 'OUTVAR')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('InputVar'), 'INVAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('v1: StringLen, OutputVar, InputVar — get length of a variable');
  }
};

// StringMid (v1 command style)
Blockly.Blocks['ahk_string_mid'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('StringMid')
      .appendField(new Blockly.FieldTextInput('OutputVar'), 'OUTVAR')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('InputVar'), 'INVAR')
      .appendField(',')
      .appendField(new Blockly.FieldNumber(1), 'START');
    this.appendDummyInput()
      .appendField('count:')
      .appendField(new Blockly.FieldNumber(10), 'COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('v1: StringMid, Output, Input, Start, Count — extract characters from a string');
  }
};

// StringSplit (v1 command style)
Blockly.Blocks['ahk_string_split'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('StringSplit')
      .appendField(new Blockly.FieldTextInput('Array'), 'ARRAY')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('InputVar'), 'INVAR');
    this.appendDummyInput()
      .appendField('delimiter:')
      .appendField(new Blockly.FieldTextInput(','), 'DELIMITERS')
      .appendField('omit chars:')
      .appendField(new Blockly.FieldTextInput(''), 'OMITCHARS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('v1: StringSplit, Array, Input, Delimiters, OmitChars — split string into array');
  }
};

// StringTrimLeft / StringTrimRight (v1 commands)
Blockly.Blocks['ahk_string_trim_v1'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['StringTrimLeft', 'L'],
        ['StringTrimRight', 'R']
      ]), 'SIDE')
      .appendField(new Blockly.FieldTextInput('OutputVar'), 'OUTVAR')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('InputVar'), 'INVAR')
      .appendField(',')
      .appendField(new Blockly.FieldNumber(1), 'COUNT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('v1: StringTrimLeft/Right, Output, Input, Count — trim characters from left or right');
  }
};

// StringGetPos (v1 command)
Blockly.Blocks['ahk_string_get_pos'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('StringGetPos')
      .appendField(new Blockly.FieldTextInput('OutputVar'), 'OUTVAR')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('InputVar'), 'INVAR')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('search'), 'SEARCHTEXT');
    this.appendDummyInput()
      .appendField('side:')
      .appendField(new Blockly.FieldDropdown([['L1 (left)', 'L1'], ['R1 (right)', 'R1']]), 'SIDE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('v1: StringGetPos, Out, Input, SearchText, Side — find position of text in string');
  }
};

// Chr / Ord / Asc
Blockly.Blocks['ahk_chr_ord'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['Chr (code→char)', 'Chr'], ['Ord (char→code)', 'Ord'], ['Asc (char→code)', 'Asc']]), 'FN')
      .appendField(new Blockly.FieldTextInput('65'), 'INPUT');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Result'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('Convert between characters and their ASCII/Unicode codes.');
  }
};

// RegExMatch
Blockly.Blocks['ahk_regex_match'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('RegExMatch')
      .appendField(new Blockly.FieldTextInput('Haystack'), 'HAYSTACK')
      .appendField('regex:')
      .appendField(new Blockly.FieldTextInput('\\\\d+'), 'REGEX');
    this.appendDummyInput()
      .appendField('match var:')
      .appendField(new Blockly.FieldTextInput('MatchOutput'), 'OUTVAR')
      .appendField('start pos:')
      .appendField(new Blockly.FieldNumber(1), 'START');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('Match text using a regular expression.');
  }
};

// RegExReplace
Blockly.Blocks['ahk_regex_replace'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('RegExReplace')
      .appendField(new Blockly.FieldTextInput('Haystack'), 'HAYSTACK')
      .appendField('regex:')
      .appendField(new Blockly.FieldTextInput('\\\\d+'), 'REGEX');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Result'), 'VAR')
      .appendField('replace with:')
      .appendField(new Blockly.FieldTextInput(''), 'REPLACEMENT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('Replace text using a regular expression.');
  }
};

// StringCaseSense
Blockly.Blocks['ahk_string_case_sense'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('StringCaseSense')
      .appendField(new Blockly.FieldDropdown([['On', 'On'], ['Off', 'Off'], ['Locale', 'Locale']]), 'MODE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('Set string case sensitivity for all string operations.');
  }
};

// ============================================
// LOOP VARIANTS (#AB47BC)
// ============================================

// Loop Files
Blockly.Blocks['ahk_loop_files'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Loop Files')
      .appendField(new Blockly.FieldTextInput('C:\\\\*.*'), 'PATTERN');
    this.appendDummyInput()
      .appendField('mode:')
      .appendField(new Blockly.FieldDropdown([
        ['files only', ''],
        ['+ folders (D)', 'D'],
        ['+ recursive (R)', 'R'],
        ['+ folders + recursive (DR)', 'DR']
      ]), 'MODE');
    this.appendStatementInput('ACTIONS')
      .appendField('do:');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#AB47BC');
    this.setTooltip('Loop through files matching a pattern. Use A_LoopFileName, A_LoopFileFullPath inside.');
  }
};

// Loop Read
Blockly.Blocks['ahk_loop_read'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Loop Read')
      .appendField(new Blockly.FieldTextInput('C:\\\\data.txt'), 'FILE');
    this.appendStatementInput('ACTIONS')
      .appendField('do (use A_LoopReadLine):');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#AB47BC');
    this.setTooltip('Read a file line by line in a loop. Use A_LoopReadLine for each line.');
  }
};

// Loop Parse
Blockly.Blocks['ahk_loop_parse'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Loop Parse')
      .appendField(new Blockly.FieldTextInput('InputVar'), 'INPUT');
    this.appendDummyInput()
      .appendField('delimiters:' )
      .appendField(new Blockly.FieldTextInput(','), 'DELIMITERS')
      .appendField('omit:')
      .appendField(new Blockly.FieldTextInput(''), 'OMIT');
    this.appendStatementInput('ACTIONS')
      .appendField('do (use A_LoopField):');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#AB47BC');
    this.setTooltip('Parse a delimited string in a loop. Use A_LoopField for each field.');
  }
};

// For Loop (v2)
Blockly.Blocks['ahk_for_loop'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('For')
      .appendField(new Blockly.FieldTextInput('Key'), 'KEYVAR')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('Value'), 'VALVAR')
      .appendField('in')
      .appendField(new Blockly.FieldTextInput('MyObject'), 'OBJECT');
    this.appendStatementInput('ACTIONS')
      .appendField('do:');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#AB47BC');
    this.setTooltip('Loop over keys/values in an object or array.');
  }
};

// Loop with Until
Blockly.Blocks['ahk_loop_until'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Loop')
      .appendField(new Blockly.FieldNumber(10), 'COUNT')
      .appendField('times');
    this.appendStatementInput('ACTIONS')
      .appendField('do:');
    this.appendDummyInput()
      .appendField('Until')
      .appendField(new Blockly.FieldTextInput('A_Index > 5'), 'CONDITION');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#AB47BC');
    this.setTooltip('Loop with an Until condition at the end.');
  }
};

// ============================================
// FILE EXTENDED (#6D4C41)
// ============================================

// FileReadLine
Blockly.Blocks['ahk_file_read_line'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('FileReadLine')
      .appendField(new Blockly.FieldTextInput('OutputVar'), 'OUTVAR')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('C:\\\\file.txt'), 'FILE')
      .appendField(', line')
      .appendField(new Blockly.FieldNumber(1), 'LINE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#6D4C41');
    this.setTooltip('Read a specific line from a file.');
  }
};

// FileGetSize
Blockly.Blocks['ahk_file_get_size'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('FileGetSize')
      .appendField(new Blockly.FieldTextInput('FileSize'), 'OUTVAR');
    this.appendDummyInput()
      .appendField('file:')
      .appendField(new Blockly.FieldTextInput('C:\\\\file.txt'), 'FILE')
      .appendField('units:')
      .appendField(new Blockly.FieldDropdown([['B', ''], ['KB', 'K'], ['MB', 'M']]), 'UNITS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#6D4C41');
    this.setTooltip('Get the size of a file.');
  }
};

// FileGetTime / FileSetTime
Blockly.Blocks['ahk_file_time'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['FileGetTime', 'get'], ['FileSetTime', 'set']]), 'ACTION')
      .appendField(new Blockly.FieldTextInput('OutputVar'), 'OUTVAR');
    this.appendDummyInput()
      .appendField('file:')
      .appendField(new Blockly.FieldTextInput('C:\\\\file.txt'), 'FILE')
      .appendField('which:')
      .appendField(new Blockly.FieldDropdown([['modified', 'M'], ['created', 'C'], ['accessed', 'A']]), 'WHICHTIME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#6D4C41');
    this.setTooltip('Get or set the timestamp of a file.');
  }
};

// FileGetAttrib / FileSetAttrib
Blockly.Blocks['ahk_file_attrib'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['FileGetAttrib', 'get'], ['FileSetAttrib', 'set']]), 'ACTION')
      .appendField(new Blockly.FieldTextInput('OutputVar'), 'OUTVAR');
    this.appendDummyInput()
      .appendField('file:')
      .appendField(new Blockly.FieldTextInput('C:\\\\file.txt'), 'FILE');
    this.appendDummyInput()
      .appendField('attribs (RASHNDOCT):')
      .appendField(new Blockly.FieldTextInput('+R'), 'ATTRIBS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#6D4C41');
    this.setTooltip('Get or set file attributes (R=ReadOnly, A=Archive, S=System, H=Hidden, N=Normal).');
  }
};

// FileGetVersion
Blockly.Blocks['ahk_file_get_version'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('FileGetVersion')
      .appendField(new Blockly.FieldTextInput('FileVersion'), 'OUTVAR');
    this.appendDummyInput()
      .appendField('file:')
      .appendField(new Blockly.FieldTextInput('C:\\\\Windows\\\\notepad.exe'), 'FILE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#6D4C41');
    this.setTooltip('Get the version of an executable or DLL file.');
  }
};

// FileRecycle
Blockly.Blocks['ahk_file_recycle'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('FileRecycle')
      .appendField(new Blockly.FieldTextInput('C:\\\\file.txt'), 'FILE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#6D4C41');
    this.setTooltip('Send a file to the Recycle Bin.');
  }
};

// FileSelectFile
Blockly.Blocks['ahk_file_select'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['FileSelectFile', 'file'], ['FileSelectFolder', 'folder']]), 'DIALOG')
      .appendField(new Blockly.FieldTextInput('SelectedFile'), 'OUTVAR');
    this.appendDummyInput()
      .appendField('title:')
      .appendField(new Blockly.FieldTextInput('Select a file'), 'TITLE')
      .appendField('filter:')
      .appendField(new Blockly.FieldTextInput('Text (*.txt), All (*.*)'), 'FILTER');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#6D4C41');
    this.setTooltip('Show a file/folder selection dialog.');
  }
};

// FileRemoveDir
Blockly.Blocks['ahk_file_remove_dir'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('FileRemoveDir')
      .appendField(new Blockly.FieldTextInput('C:\\\\Folder'), 'DIR')
      .appendField('recurse:')
      .appendField(new Blockly.FieldCheckbox(false), 'RECURSE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#6D4C41');
    this.setTooltip('Delete a directory (check recurse to delete non-empty folders).');
  }
};

// FileCopyDir / FileMoveDir
Blockly.Blocks['ahk_file_copy_dir'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['FileCopyDir', 'copy'], ['FileMoveDir', 'move']]), 'ACTION')
      .appendField(new Blockly.FieldTextInput('C:\\\\source'), 'SOURCE');
    this.appendDummyInput()
      .appendField('to')
      .appendField(new Blockly.FieldTextInput('C:\\\\dest'), 'DEST')
      .appendField('overwrite:')
      .appendField(new Blockly.FieldCheckbox(false), 'OVERWRITE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#6D4C41');
    this.setTooltip('Copy or move an entire directory.');
  }
};

// FileCreateShortcut
Blockly.Blocks['ahk_file_shortcut'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('FileCreateShortcut')
      .appendField(new Blockly.FieldTextInput('C:\\\\target.exe'), 'TARGET');
    this.appendDummyInput()
      .appendField('link file:')
      .appendField(new Blockly.FieldTextInput('C:\\\\shortcut.lnk'), 'LINK')
      .appendField('args:')
      .appendField(new Blockly.FieldTextInput(''), 'ARGS');
    this.appendDummyInput()
      .appendField('working dir:')
      .appendField(new Blockly.FieldTextInput(''), 'WORKDIR')
      .appendField('desc:')
      .appendField(new Blockly.FieldTextInput(''), 'DESC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#6D4C41');
    this.setTooltip('Create a shortcut file (.lnk).');
  }
};

// ============================================
// WINDOW EXTENDED v1 (#F9A825)
// ============================================

// WinKill
Blockly.Blocks['ahk_win_kill'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('WinKill')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Force close a window (kills the process).');
  }
};

// WinRestore
Blockly.Blocks['ahk_win_restore'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('WinRestore')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Restore a minimized/maximized window to its normal size.');
  }
};

// WinGet with subcommands
Blockly.Blocks['ahk_win_get'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('WinGet')
      .appendField(new Blockly.FieldTextInput('OutputVar'), 'OUTVAR')
      .appendField(',')
      .appendField(new Blockly.FieldDropdown([
        ['ID', 'ID'],
        ['PID', 'PID'],
        ['ProcessName', 'ProcessName'],
        ['ProcessPath', 'ProcessPath'],
        ['Count', 'Count'],
        ['MinMax', 'MinMax'],
        ['Style', 'Style'],
        ['ExStyle', 'ExStyle'],
        ['Transparent', 'Transparent'],
        ['ControlList', 'ControlList']
      ]), 'SUBCOMMAND');
    this.appendDummyInput()
      .appendField('window title:')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Get detailed information about a window.');
  }
};

// WinSet with subcommands
Blockly.Blocks['ahk_win_set'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('WinSet')
      .appendField(new Blockly.FieldDropdown([
        ['AlwaysOnTop', 'AlwaysOnTop'],
        ['Bottom', 'Bottom'],
        ['Top', 'Top'],
        ['Disable', 'Disable'],
        ['Enable', 'Enable'],
        ['Redraw', 'Redraw'],
        ['Region', 'Region'],
        ['Transparent', 'Transparent'],
        ['TransColor', 'TransColor']
      ]), 'SUBCOMMAND')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('On'), 'VALUE');
    this.appendDummyInput()
      .appendField('window title:')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Set advanced window properties (AlwaysOnTop, Transparent, etc).');
  }
};

// WinMinimizeAll / WinMinimizeAllUndo
Blockly.Blocks['ahk_win_minimize_all'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['WinMinimizeAll', 'All'],
        ['WinMinimizeAllUndo', 'AllUndo']
      ]), 'ACTION');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Minimize all windows or undo the minimization.');
  }
};

// WinGetText
Blockly.Blocks['ahk_win_get_text'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('WinGetText')
      .appendField(new Blockly.FieldTextInput('WinText'), 'VAR');
    this.appendDummyInput()
      .appendField('window title:')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Get the text content of a window.');
  }
};

// SetTitleMatchMode
Blockly.Blocks['ahk_set_title_match'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('SetTitleMatchMode')
      .appendField(new Blockly.FieldDropdown([
        ['1: starts with', '1'],
        ['2: contains', '2'],
        ['3: exact', '3'],
        ['RegEx', 'RegEx']
      ]), 'MODE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Set how window titles are matched (1=starts with, 2=contains, 3=exact, RegEx).');
  }
};

// ============================================
// CONTROL EXTENDED (#F9A825)
// ============================================

// ControlFocus / ControlGetFocus
Blockly.Blocks['ahk_control_focus'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['ControlFocus', 'focus'], ['ControlGetFocus', 'getfocus']]), 'ACTION')
      .appendField(new Blockly.FieldTextInput('Button1'), 'CONTROL')
      .appendField('on')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Set or get focus on a control.');
  }
};

// ControlGetPos
Blockly.Blocks['ahk_control_get_pos'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('ControlGetPos')
      .appendField(new Blockly.FieldTextInput('Button1'), 'CONTROL');
    this.appendDummyInput()
      .appendField('→ x:')
      .appendField(new Blockly.FieldTextInput('CtrlX'), 'VARX')
      .appendField('y:')
      .appendField(new Blockly.FieldTextInput('CtrlY'), 'VARY')
      .appendField('w:')
      .appendField(new Blockly.FieldTextInput('CtrlW'), 'VARW')
      .appendField('h:')
      .appendField(new Blockly.FieldTextInput('CtrlH'), 'VARH')
      .appendField('on')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Get position and size of a control in a window.');
  }
};

// PostMessage / SendMessage
Blockly.Blocks['ahk_post_message'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['PostMessage', 'Post'], ['SendMessage', 'Send']]), 'ACTION')
      .appendField('msg:')
      .appendField(new Blockly.FieldNumber(0x0201), 'MSG');
    this.appendDummyInput()
      .appendField('wParam:')
      .appendField(new Blockly.FieldTextInput('0'), 'WPARAM')
      .appendField('lParam:')
      .appendField(new Blockly.FieldTextInput('0'), 'LPARAM');
    this.appendDummyInput()
      .appendField('control:')
      .appendField(new Blockly.FieldTextInput('Button1'), 'CONTROL')
      .appendField('on')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Send a Windows message to a control or window. Use decimal or hex (0x...) values.');
  }
};

// StatusBarGetText
Blockly.Blocks['ahk_status_bar'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['StatusBarGetText', 'get'], ['StatusBarWait', 'wait']]), 'ACTION')
      .appendField(new Blockly.FieldTextInput('StatusText'), 'VAR');
    this.appendDummyInput()
      .appendField('part:')
      .appendField(new Blockly.FieldNumber(1, 1), 'PART')
      .appendField('window:')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Get text from a status bar or wait for it to change.');
  }
};

// ============================================
// SYSTEM EXTENDED (#EC407A)
// ============================================

// SysGet
Blockly.Blocks['ahk_sys_get'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('SysGet')
      .appendField(new Blockly.FieldTextInput('SysInfo'), 'VAR');
    this.appendDummyInput()
      .appendField('subcommand:')
      .appendField(new Blockly.FieldTextInput('MonitorCount'), 'SUBCOMMAND');
    this.appendDummyInput()
      .appendField('(or number:')
      .appendField(new Blockly.FieldNumber(0), 'NUMBER')
      .appendField(')');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Get system information (MonitorCount, VirtualDesktopWidth, etc.).');
  }
};

// Pause
Blockly.Blocks['ahk_pause'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Pause')
      .appendField(new Blockly.FieldDropdown([['toggle', 'Toggle'], ['on', 'On'], ['off', 'Off']]), 'MODE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Pause or resume the script.');
  }
};

// ListVars / ListLines / ListHotkeys / KeyHistory / OutputDebug
Blockly.Blocks['ahk_debug_commands'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['ListVars', 'ListVars'],
        ['ListLines', 'ListLines'],
        ['ListHotkeys', 'ListHotkeys'],
        ['KeyHistory', 'KeyHistory'],
        ['OutputDebug', 'OutputDebug']
      ]), 'CMD');
    this.appendDummyInput()
      .appendField('text (for OutputDebug):')
      .appendField(new Blockly.FieldTextInput('Debug message'), 'TEXT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Debug commands: show variables, lines, hotkeys, key history, or send debug output.');
  }
};

// Critical
Blockly.Blocks['ahk_critical'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Critical')
      .appendField(new Blockly.FieldDropdown([['On', 'On'], ['Off', 'Off']]), 'MODE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Enable or disable critical (high-priority) thread mode.');
  }
};

// VarSetCapacity
Blockly.Blocks['ahk_var_set_capacity'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('VarSetCapacity')
      .appendField(new Blockly.FieldTextInput('MyVar'), 'VAR')
      .appendField(',')
      .appendField(new Blockly.FieldNumber(1024), 'SIZE')
      .appendField('fill byte:')
      .appendField(new Blockly.FieldNumber(0), 'FILL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Set the capacity of a variable (for binary data operations).');
  }
};

// NumGet / NumPut
Blockly.Blocks['ahk_num_get_put'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['NumGet', 'get'], ['NumPut', 'put']]), 'ACTION')
      .appendField(new Blockly.FieldTextInput('VarOrAddress'), 'VAR');
    this.appendDummyInput()
      .appendField('offset:')
      .appendField(new Blockly.FieldNumber(0), 'OFFSET')
      .appendField('type:')
      .appendField(new Blockly.FieldDropdown([
        ['Int', 'Int'],
        ['UInt', 'UInt'],
        ['Short', 'Short'],
        ['UShort', 'UShort'],
        ['Char', 'Char'],
        ['UChar', 'UChar'],
        ['Int64', 'Int64'],
        ['Float', 'Float'],
        ['Double', 'Double'],
        ['Ptr', 'Ptr']
      ]), 'TYPE');
    this.appendDummyInput()
      .appendField('value (for NumPut):')
      .appendField(new Blockly.FieldNumber(0), 'VALUE')
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Result'), 'OUTVAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Read or write binary data (NumGet/NumPut) from/to a buffer.');
  }
};

// SetWorkingDir (explicit block)
Blockly.Blocks['ahk_set_working_dir'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('SetWorkingDir')
      .appendField(new Blockly.FieldTextInput('%A_ScriptDir%'), 'DIR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Change the script working directory.');
  }
};

// ============================================
// DIRECTIVES (#455A64)
// ============================================

Blockly.Blocks['ahk_directive'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('#' + new Blockly.FieldDropdown([
        ['NoTrayIcon', 'NoTrayIcon'],
        ['Persistent', 'Persistent'],
        ['SingleInstance Force', 'SingleInstance, Force'],
        ['SingleInstance Off', 'SingleInstance, Off'],
        ['InstallKeybdHook', 'InstallKeybdHook'],
        ['InstallMouseHook', 'InstallMouseHook'],
        ['UseHook', 'UseHook'],
        ['WinActivateForce', 'WinActivateForce'],
        ['MaxThreads', 'MaxThreads, 20'],
        ['MaxHotkeysPerInterval', 'MaxHotkeysPerInterval, 200'],
        ['HotkeyInterval', 'HotkeyInterval, 2000'],
        ['NoEnv', 'NoEnv'],
        ['Warn', 'Warn'],
        ['ClipboardTimeout', 'ClipboardTimeout, 1000'],
        ['ErrorStdOut', 'ErrorStdOut'],
        ['MaxMem', 'MaxMem, 256']
      ]), 'DIRECTIVE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#455A64');
    this.setTooltip('Add a script directive (hashtag directive). Place at top of script.');
  }
};

// ============================================
// SOUND EXTENDED (#FF6F00)
// ============================================

// SoundGet / SoundSet with more options
Blockly.Blocks['ahk_sound_get_set'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['SoundGet', 'get'],
        ['SoundSet', 'set']
      ]), 'ACTION')
      .appendField(new Blockly.FieldTextInput('SoundOut'), 'OUTVAR');
    this.appendDummyInput()
      .appendField('new value:')
      .appendField(new Blockly.FieldNumber(50), 'VALUE')
      .appendField('component:')
      .appendField(new Blockly.FieldDropdown([
        ['MASTER', 'MASTER'],
        ['MICROPHONE', 'MICROPHONE'],
        ['WAVE', 'WAVE'],
        ['SYNTH', 'SYNTH'],
        ['CD', 'CD'],
        ['LINE IN', 'LINE IN']
      ]), 'COMPONENT')
      .appendField('type:')
      .appendField(new Blockly.FieldDropdown([['volume', ''], ['mute', 'mute']]), 'CTRLTYPE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#FF6F00');
    this.setTooltip('v1: SoundGet/SoundSet — get or set audio settings.');
  }
};

// SoundGetWaveVolume / SoundSetWaveVolume
Blockly.Blocks['ahk_sound_wave'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['SoundGetWaveVolume', 'get'], ['SoundSetWaveVolume', 'set']]), 'ACTION')
      .appendField(new Blockly.FieldTextInput('WaveVol'), 'OUTVAR');
    this.appendDummyInput()
      .appendField('value:')
      .appendField(new Blockly.FieldNumber(50, 0, 100), 'VALUE')
      .appendField('%');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#FF6F00');
    this.setTooltip('Get or set the wave volume (0-100).');
  }
};

// ============================================
// REGISTRY EXTENDED (#795548)
// ============================================

// RegDelete
Blockly.Blocks['ahk_reg_delete'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('RegDelete')
      .appendField(new Blockly.FieldDropdown([['HKLM', 'HKLM'], ['HKCU', 'HKCU'], ['HKCR', 'HKCR'], ['HKCC', 'HKCC']]), 'ROOT');
    this.appendDummyInput()
      .appendField('subkey:')
      .appendField(new Blockly.FieldTextInput('Software\\\\OldApp'), 'SUBKEY')
      .appendField('value:')
      .appendField(new Blockly.FieldTextInput(''), 'VALNAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#795548');
    this.setTooltip('Delete a registry key or value. Leave value field empty to delete the whole key.');
  }
};

// ============================================
// INI EXTENDED (#795548)
// ============================================

// IniDelete
Blockly.Blocks['ahk_ini_delete'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('IniDelete')
      .appendField(new Blockly.FieldTextInput('C:\\\\config.ini'), 'FILE');
    this.appendDummyInput()
      .appendField('section:')
      .appendField(new Blockly.FieldTextInput('Settings'), 'SECTION')
      .appendField('key:')
      .appendField(new Blockly.FieldTextInput(''), 'KEY');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#795548');
    this.setTooltip('Delete a key from an INI file. Leave key empty to delete the whole section.');
  }
};

// ============================================
// DIALOG EXTENDED (#546E7A)
// ============================================

// Progress bar
Blockly.Blocks['ahk_progress'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Progress')
      .appendField(new Blockly.FieldNumber(50, 0, 100), 'VALUE')
      .appendField('%');
    this.appendDummyInput()
      .appendField('text:')
      .appendField(new Blockly.FieldTextInput('Processing...'), 'TEXT')
      .appendField('title:')
      .appendField(new Blockly.FieldTextInput('Progress'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#546E7A');
    this.setTooltip('Show a progress bar dialog (0-100%).');
  }
};

// SplashImage
Blockly.Blocks['ahk_splash_image'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('SplashImage')
      .appendField(new Blockly.FieldTextInput('C:\\\\image.png'), 'IMAGE');
    this.appendDummyInput()
      .appendField('options:')
      .appendField(new Blockly.FieldTextInput('w200 h200'), 'OPTIONS')
      .appendField('text:')
      .appendField(new Blockly.FieldTextInput('Hello!'), 'TEXT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#546E7A');
    this.setTooltip('Show a splash image on screen.');
  }
};

// ============================================
// MATH EXTENDED (#1E88E5)
// ============================================

// Mod block
Blockly.Blocks['ahk_mod'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Mod')
      .appendField(new Blockly.FieldNumber(10), 'A')
      .appendField('mod')
      .appendField(new Blockly.FieldNumber(3), 'B');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('ModResult'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#1E88E5');
    this.setTooltip('Get the remainder (modulo) of division.');
  }
};

// ============================================
// TIME EXTENDED (#00897B)  
// ============================================

// EnvAdd / EnvSub
Blockly.Blocks['ahk_env_time'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['EnvAdd', 'add'], ['EnvSub', 'sub']]), 'ACTION')
      .appendField(new Blockly.FieldTextInput('DateVar'), 'VAR');
    this.appendDummyInput()
      .appendField('value:')
      .appendField(new Blockly.FieldNumber(7), 'VALUE')
      .appendField('units:')
      .appendField(new Blockly.FieldDropdown([['days', 'Days'], ['hours', 'Hours'], ['minutes', 'Minutes'], ['seconds', 'Seconds']]), 'UNITS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('v1: EnvAdd/EnvSub — add or subtract time from a date variable.');
  }
};

// ============================================
// NETWORK EXTENDED (#EC407A)
// ============================================

// UrlDownloadToFile (v1-specific)
Blockly.Blocks['ahk_url_download'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('UrlDownloadToFile')
      .appendField(new Blockly.FieldTextInput('https://example.com/file.zip'), 'URL');
    this.appendDummyInput()
      .appendField('to')
      .appendField(new Blockly.FieldTextInput('C:\\\\file.zip'), 'FILE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('v1: Download a file from a URL (synchronous, script pauses until done).');
  }
};

// ============================================
// GUI SIMPLIFIED (#7C4DFF)
// ============================================

// Gui Show (simplified)
Blockly.Blocks['ahk_gui_show'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Gui, Show')
      .appendField(new Blockly.FieldTextInput('w300 h200'), 'OPTIONS')
      .appendField('title:')
      .appendField(new Blockly.FieldTextInput('My Window'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#7C4DFF');
    this.setTooltip('Show a simple GUI window with options like "w300 h200".');
  }
};

// Gui, Add control
Blockly.Blocks['ahk_gui_add'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Gui, Add,')
      .appendField(new Blockly.FieldDropdown([
        ['Text', 'Text'],
        ['Edit', 'Edit'],
        ['Button', 'Button'],
        ['CheckBox', 'CheckBox'],
        ['Radio', 'Radio'],
        ['DropDownList', 'DropDownList'],
        ['ComboBox', 'ComboBox'],
        ['ListBox', 'ListBox'],
        ['GroupBox', 'GroupBox'],
        ['Progress', 'Progress'],
        ['Slider', 'Slider'],
        ['Hotkey', 'Hotkey'],
        ['DateTime', 'DateTime'],
        ['Picture', 'Picture']
      ]), 'CONTROLTYPE')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('x10 y10 w100 h20'), 'OPTIONS')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('Click me!'), 'TEXT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#7C4DFF');
    this.setTooltip('Add a control to a GUI window.');
  }
};

// Gui, Hide / Destroy
Blockly.Blocks['ahk_gui_hide'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Gui,')
      .appendField(new Blockly.FieldDropdown([['Hide', 'Hide'], ['Destroy', 'Destroy'], ['Minimize', 'Minimize'], ['Restore', 'Restore'], ['Submit', 'Submit']]), 'ACTION');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#7C4DFF');
    this.setTooltip('Hide, destroy, minimize, restore, or submit a GUI.');
  }
};

// GuiControl
Blockly.Blocks['ahk_gui_control'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('GuiControl,')
      .appendField(new Blockly.FieldDropdown([
        ['Show', 'Show'],
        ['Hide', 'Hide'],
        ['Enable', 'Enable'],
        ['Disable', 'Disable'],
        ['Text', 'Text'],
        ['Move', 'Move']
      ]), 'SUBCOMMAND')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('MyEdit'), 'CONTROLID')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('New Value'), 'VALUE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#7C4DFF');
    this.setTooltip('Modify a GUI control property (show, hide, text, move, etc).');
  }
};

// Gui, Font
Blockly.Blocks['ahk_gui_font'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Gui, Font,')
      .appendField(new Blockly.FieldTextInput('s10 bold'), 'OPTIONS')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('Segoe UI'), 'FONTNAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#7C4DFF');
    this.setTooltip('Set font for subsequent GUI controls.');
  }
};

// Gui, Color
Blockly.Blocks['ahk_gui_color'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Gui, Color,')
      .appendField(new Blockly.FieldTextInput('FFFFFF'), 'BGCOLOR')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput(''), 'CTLCOLOR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#7C4DFF');
    this.setTooltip('Set GUI window and control background colors (hex without #).');
  }
};

// Gui, Submit
Blockly.Blocks['ahk_gui_submit'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Gui, Submit')
      .appendField(new Blockly.FieldCheckbox(false), 'NOHIDE')
      .appendField('no hide');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#7C4DFF');
    this.setTooltip('Submit GUI to collect control values into variables.');
  }
};

// ============================================
// KEYBOARD EXTENDED (#4285F4)
// ============================================

// SendRaw / SendPlay / SendEvent
Blockly.Blocks['ahk_send_variant'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['SendRaw', 'SendRaw'],
        ['SendPlay', 'SendPlay'],
        ['SendEvent', 'SendEvent']
      ]), 'MODE')
      .appendField(new Blockly.FieldTextInput('Hello World!'), 'KEYS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#4285F4');
    this.setTooltip('Send keystrokes using a specific method: Raw, Play, or Event.');
  }
};

// SetKeyDelay / SetMouseDelay / SetDefaultMouseSpeed
Blockly.Blocks['ahk_set_delay'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['SetKeyDelay', 'SetKeyDelay'],
        ['SetMouseDelay', 'SetMouseDelay'],
        ['SetDefaultMouseSpeed', 'SetDefaultMouseSpeed']
      ]), 'CMD')
      .appendField(new Blockly.FieldNumber(10), 'DELAY')
      .appendField('ms');
    this.appendDummyInput()
      .appendField('press duration (KeyDelay only):')
      .appendField(new Blockly.FieldNumber(-1), 'PRESSDUR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#4285F4');
    this.setTooltip('Set keyboard/mouse delay. SetKeyDelay: delay, pressDuration. SetMouseDelay: delay. SetDefaultMouseSpeed: speed (0-100).');
  }
};

// SendLevel
Blockly.Blocks['ahk_send_level'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('SendLevel')
      .appendField(new Blockly.FieldNumber(0, 0, 100), 'LEVEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#4285F4');
    this.setTooltip('Set the send level (0-100) for hotkey prioritization.');
  }
};

// ============================================
// WINDOW EXTENDED v2 (#F9A825)
// ============================================

// WinWaitClose / WinWaitNotActive
Blockly.Blocks['ahk_win_wait_close'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('WinWaitClose')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE')
      .appendField('timeout:')
      .appendField(new Blockly.FieldNumber(5, 0), 'TIMEOUT')
      .appendField('s');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Wait for a window to close.');
  }
};

Blockly.Blocks['ahk_win_wait_not_active'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('WinWaitNotActive')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE')
      .appendField('timeout:')
      .appendField(new Blockly.FieldNumber(5, 0), 'TIMEOUT')
      .appendField('s');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Wait for a window to stop being active.');
  }
};

// WinActive (expression block)
Blockly.Blocks['ahk_win_active'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('window active?')
      .appendField(new Blockly.FieldTextInput('Untitled - Notepad'), 'TITLE');
    this.setOutput(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Check if a specific window is active. Returns window handle or 0.');
  }
};

// WinRedraw
Blockly.Blocks['ahk_win_redraw'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('WinRedraw')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Redraw/refresh a window.');
  }
};

// ============================================
// CONTROL EXTENDED v2 (#F9A825)
// ============================================

// ControlMove
Blockly.Blocks['ahk_control_move'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('ControlMove')
      .appendField(new Blockly.FieldTextInput('Button1'), 'CONTROL');
    this.appendDummyInput()
      .appendField('x:')
      .appendField(new Blockly.FieldNumber(10), 'X')
      .appendField('y:')
      .appendField(new Blockly.FieldNumber(10), 'Y')
      .appendField('w:')
      .appendField(new Blockly.FieldNumber(100), 'W')
      .appendField('h:')
      .appendField(new Blockly.FieldNumber(30), 'H')
      .appendField('on')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Move or resize a control in a window.');
  }
};

// ControlSendRaw
Blockly.Blocks['ahk_control_send_raw'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('ControlSendRaw')
      .appendField(new Blockly.FieldTextInput('Edit1'), 'CONTROL')
      .appendField('keys:')
      .appendField(new Blockly.FieldTextInput('Hello'), 'KEYS')
      .appendField('on')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Send raw keystrokes directly to a control (without translating {Enter} etc).');
  }
};

// ============================================
// HOTKEY / HOTSTRING (#4285F4)
// ============================================

// Hotkey command (runtime)
Blockly.Blocks['ahk_hotkey_cmd'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Hotkey')
      .appendField(new Blockly.FieldTextInput('^!s'), 'KEYNAME')
      .appendField('label:')
      .appendField(new Blockly.FieldTextInput('MyLabel'), 'LABEL')
      .appendField('options:')
      .appendField(new Blockly.FieldDropdown([['', ''], ['On', 'On'], ['Off', 'Off'], ['Toggle', 'Toggle']]), 'OPTIONS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#4285F4');
    this.setTooltip('Create/modify/disable a hotkey at runtime.');
  }
};

// Hotstring
Blockly.Blocks['ahk_hotstring'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('::')
      .appendField(new Blockly.FieldTextInput('btw'), 'TRIGGER')
      .appendField('::')
      .appendField(new Blockly.FieldTextInput('by the way'), 'REPLACEMENT');
    this.appendDummyInput()
      .appendField('options:')
      .appendField(new Blockly.FieldTextInput('*'), 'OPTIONS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#4285F4');
    this.setTooltip('Define a hotstring (auto-replace text). Options: * (end char not needed), ? (inside words), C (case sensitive).');
  }
};

// ============================================
// GOTO / GOSUB / RETURN (#AB47BC)
// ============================================

// Goto
Blockly.Blocks['ahk_goto'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Goto')
      .appendField(new Blockly.FieldTextInput('MyLabel'), 'LABEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#AB47BC');
    this.setTooltip('Jump to a label in the script.');
  }
};

// Gosub
Blockly.Blocks['ahk_gosub'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Gosub')
      .appendField(new Blockly.FieldTextInput('MySubroutine'), 'LABEL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#AB47BC');
    this.setTooltip('Call a subroutine (label) and return.');
  }
};

// Return
Blockly.Blocks['ahk_return'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Return');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#AB47BC');
    this.setTooltip('Return from a subroutine or function.');
  }
};

// Label definition
Blockly.Blocks['ahk_label'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('label:')
      .appendField(new Blockly.FieldTextInput('MyLabel'), 'NAME')
      .appendField(':');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#AB47BC');
    this.setTooltip('Define a label for Goto/Gosub.');
  }
};

// ============================================
// COM FUNCTIONS (#EC407A)
// ============================================

// ComObjGet
Blockly.Blocks['ahk_com_obj_get'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('ComObjGet')
      .appendField(new Blockly.FieldTextInput('winmgmts:\\\.\\root\\cimv2'), 'MONIKER')
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('ComObj'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Get a running COM object from a moniker (e.g., WMI, Shell).');
  }
};

// ComObjActive
Blockly.Blocks['ahk_com_obj_active'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('ComObjActive')
      .appendField(new Blockly.FieldTextInput('Excel.Application'), 'CLASS')
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('ComObj'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Get an already-running COM object.');
  }
};

// ComObjConnect
Blockly.Blocks['ahk_com_obj_connect'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('ComObjConnect')
      .appendField(new Blockly.FieldTextInput('ComObject'), 'OBJ')
      .appendField('prefix:')
      .appendField(new Blockly.FieldTextInput('IE_'), 'PREFIX');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Connect COM object events to functions with a prefix.');
  }
};

// ============================================
// SCRIPT CONTROL (#EC407A)
// ============================================

// SetBatchLines
Blockly.Blocks['ahk_set_batch_lines'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('SetBatchLines')
      .appendField(new Blockly.FieldDropdown([
        ['-1 (fastest)', '-1'],
        ['10ms', '10'],
        ['50ms', '50'],
        ['100ms', '100'],
        ['250ms', '250']
      ]), 'MS');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Set how often the script sleeps (batch line interval). -1 = fastest.');
  }
};

// SetEnv (old style)
Blockly.Blocks['ahk_set_env'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('SetEnv')
      .appendField(new Blockly.FieldTextInput('MyVar'), 'VAR')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('value'), 'VALUE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E53935');
    this.setTooltip('v1: Set a variable (legacy syntax). Same as Var := Value.');
  }
};

// Thread
Blockly.Blocks['ahk_thread'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Thread')
      .appendField(new Blockly.FieldDropdown([
        ['NoTimers', 'NoTimers'],
        ['Priority', 'Priority'],
        ['Interrupt', 'Interrupt']
      ]), 'SUBCOMMAND')
      .appendField(new Blockly.FieldNumber(0), 'VALUE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Thread settings: NoTimers (disable timers), Priority (set thread priority), Interrupt (set interrupt interval).');
  }
};

// ============================================
// TRY / CATCH / THROW (#AB47BC)
// ============================================

// Try
Blockly.Blocks['ahk_try'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Try');
    this.appendStatementInput('ACTIONS')
      .appendField('do:');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#AB47BC');
    this.setTooltip('v2: Try block. Wrap code that might throw errors.');
  }
};

// Catch
Blockly.Blocks['ahk_catch'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Catch')
      .appendField(new Blockly.FieldTextInput('Error'), 'ERRVAR')
      .appendField('as error');
    this.appendStatementInput('ACTIONS')
      .appendField('handle:');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#AB47BC');
    this.setTooltip('v2: Catch block. Handle errors from a Try block.');
  }
};

// Throw
Blockly.Blocks['ahk_throw'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Throw')
      .appendField(new Blockly.FieldTextInput('Error("Something went wrong")'), 'EXPR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#AB47BC');
    this.setTooltip('v2: Throw an exception (Error object).');
  }
};

// ============================================
// HOTIF / CONTEXT-SENSITIVE HOTKEYS (#4285F4)
// ============================================

// HotIf
Blockly.Blocks['ahk_hot_if'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('HotIf')
      .appendField(new Blockly.FieldDropdown([
        ['condition (expression)', 'expr'],
        ['WinActive', 'WinActive'],
        ['WinExist', 'WinExist']
      ]), 'MODE');
    this.appendDummyInput()
      .appendField('title / expression:')
      .appendField(new Blockly.FieldTextInput('ahk_class Notepad'), 'COND');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#4285F4');
    this.setTooltip('v2: Set context for subsequent hotkeys. Example: HotIf WinActive("ahk_class Notepad")');
  }
};

// ============================================
// V2 INTROSPECTION: Type(), IsSet, StrCompare (#78909C)
// ============================================

// Type() function
Blockly.Blocks['ahk_type_fn'] = {
  init: function () {
    this.appendValueInput('VALUE').appendField('Type of');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('TypeResult'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#78909C');
    this.setTooltip('v2: Get the type name of a value (e.g., "String", "Integer", "Object")');
  }
};

// IsSet
Blockly.Blocks['ahk_isset'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('IsSet')
      .appendField(new Blockly.FieldTextInput('MyVar'), 'VARNAME');
    this.setOutput(true, null);
    this.setColour('#78909C');
    this.setTooltip('v2: Check if a variable has been assigned a value.');
  }
};

// StrCompare
Blockly.Blocks['ahk_strcompare'] = {
  init: function () {
    this.appendValueInput('STR1').setCheck('String').appendField('StrCompare');
    this.appendValueInput('STR2').setCheck('String').appendField('vs');
    this.appendDummyInput()
      .appendField('case sensitive:')
      .appendField(new Blockly.FieldCheckbox(false), 'CASESENSE');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('CompareResult'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('v2: Compare two strings. Returns 0 if equal, <0 if Str1 < Str2, >0 if Str1 > Str2.');
  }
};

// HasBase / HasMethod / HasProp
Blockly.Blocks['ahk_obj_inspect'] = {
  init: function () {
    this.appendValueInput('OBJ').appendField(new Blockly.FieldDropdown([
      ['HasBase', 'HasBase'],
      ['HasMethod', 'HasMethod'],
      ['HasProp', 'HasProp']
    ]), 'FN')
      .appendField(new Blockly.FieldTextInput('Obj'), 'OBJNAME');
    this.appendDummyInput()
      .appendField('name:')
      .appendField(new Blockly.FieldTextInput('propName'), 'NAME');
    this.setOutput(true, null);
    this.setColour('#7C4DFF');
    this.setTooltip('v2: Object introspection — check if an object has a base/method/property');
  }
};

// ============================================
// V2 StrSplit (#00897B)
// ============================================

Blockly.Blocks['ahk_strsplit_v2'] = {
  init: function () {
    this.appendValueInput('STRING').setCheck('String').appendField('StrSplit');
    this.appendDummyInput()
      .appendField('delimiters:')
      .appendField(new Blockly.FieldTextInput(','), 'DELIMITERS')
      .appendField('omit chars:')
      .appendField(new Blockly.FieldTextInput(''), 'OMITCHARS');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('ResultArray'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('v2: Split a string into an array of substrings.');
  }
};

// ============================================
// V2 Buffer (#EC407A)
// ============================================

Blockly.Blocks['ahk_buffer'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Buffer')
      .appendField(new Blockly.FieldNumber(1024), 'SIZE')
      .appendField('bytes');
    this.appendDummyInput()
      .appendField('fill byte:')
      .appendField(new Blockly.FieldNumber(0), 'FILL');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('MyBuffer'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('v2: Create a Buffer object for binary data operations.');
  }
};

// ============================================
// COM EXTENDED: ComCall, ComValue (#EC407A)
// ============================================

// ComCall
Blockly.Blocks['ahk_com_call'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('ComCall')
      .appendField(new Blockly.FieldNumber(0), 'INDEX')
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('ComObj'), 'OBJ');
    this.appendDummyInput()
      .appendField('arg types:')
      .appendField(new Blockly.FieldTextInput('Int'), 'ARGTYPES')
      .appendField('return:')
      .appendField(new Blockly.FieldTextInput('Int'), 'RETURNTYPE');
    this.appendDummyInput()
      .appendField('arg1:')
      .appendField(new Blockly.FieldTextInput('0'), 'ARG1');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('CallResult'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('v2: Call a COM interface method by index.');
  }
};

// ComValue
Blockly.Blocks['ahk_com_value'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('ComValue')
      .appendField(new Blockly.FieldDropdown([
        ['VT_I4 (int)', 'VT_I4'],
        ['VT_R8 (double)', 'VT_R8'],
        ['VT_BSTR (string)', 'VT_BSTR'],
        ['VT_BOOL', 'VT_BOOL'],
        ['VT_ARRAY', 'VT_ARRAY'],
        ['VT_DISPATCH', 'VT_DISPATCH'],
        ['VT_UNKNOWN', 'VT_UNKNOWN'],
        ['VT_BYREF', 'VT_BYREF']
      ]), 'VARTYPE')
      .appendField(new Blockly.FieldTextInput('0'), 'VALUE');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('ComVar'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('v2: Create a COM wrapper for a value (for DllCall/ComCall interop).');
  }
};

// ============================================
// V2 DIRECTORY OPS: DirCopy, DirMove, DirDelete (#6D4C41)
// ============================================

Blockly.Blocks['ahk_dir_v2'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['DirCreate', 'DirCreate'],
        ['DirDelete', 'DirDelete'],
        ['DirCopy', 'DirCopy'],
        ['DirMove', 'DirMove']
      ]), 'ACTION');
    this.appendDummyInput()
      .appendField('source:')
      .appendField(new Blockly.FieldTextInput('C:\\folder'), 'SOURCE');
    this.appendDummyInput()
      .appendField('dest (for copy/move):')
      .appendField(new Blockly.FieldTextInput('C:\\dest'), 'DEST');
    this.appendDummyInput()
      .appendField('recurse (for delete):')
      .appendField(new Blockly.FieldCheckbox(false), 'RECURSE');
    this.appendDummyInput()
      .appendField('overwrite (for copy/move):')
      .appendField(new Blockly.FieldCheckbox(false), 'OVERWRITE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#6D4C41');
    this.setTooltip('v2: Create, delete, copy, or move a directory.');
  }
};

// ============================================
// SYSTEM TIMING: SetWinDelay, SetControlDelay, SetStoreCapslockMode (#EC407A)
// ============================================

Blockly.Blocks['ahk_set_sys_delay'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['SetWinDelay', 'SetWinDelay'],
        ['SetControlDelay', 'SetControlDelay'],
        ['SetStoreCapslockMode', 'SetStoreCapslockMode']
      ]), 'CMD')
      .appendField(new Blockly.FieldNumber(50), 'VALUE')
      .appendField(new Blockly.FieldDropdown([['ms', 'ms'], ['(On)', 'on'], ['(Off)', 'off']]), 'MODE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Set window/control delay (ms) or store capslock mode (On/Off).');
  }
};

// ============================================
// DRIVE (#EC407A)
// ============================================

Blockly.Blocks['ahk_drive'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['DriveGet', 'DriveGet'],
        ['Drive', 'Drive'],
        ['DriveSpaceFree', 'DriveSpaceFree'],
        ['DriveGetSerial', 'n/a']
      ]), 'ACTION')
      .appendField(new Blockly.FieldTextInput('DriveVar'), 'VAR');
    this.appendDummyInput()
      .appendField('subcommand:')
      .appendField(new Blockly.FieldDropdown([
        ['List', 'List'],
        ['Type', 'Type'],
        ['Status', 'Status'],
        ['Capacity', 'Capacity'],
        ['FileSystem', 'FileSystem'],
        ['Label', 'Label'],
        ['Serial', 'Serial']
      ]), 'SUBCOMMAND');
    this.appendDummyInput()
      .appendField('drive:')
      .appendField(new Blockly.FieldTextInput('C:'), 'DRIVE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('v1: Get drive information (list, type, capacity, filesystem, label, serial).');
  }
};

// ============================================
// FILE ENCODING / ENVUPDATE (#6D4C41)
// ============================================

Blockly.Blocks['ahk_file_encoding'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('FileEncoding')
      .appendField(new Blockly.FieldDropdown([
        ['UTF-8', 'UTF-8'],
        ['UTF-8-RAW', 'UTF-8-RAW'],
        ['UTF-16', 'UTF-16'],
        ['UTF-16-RAW', 'UTF-16-RAW'],
        ['ANSI (CP0)', 'CP0'],
        ['Windows-1252', 'CP1252']
      ]), 'ENCODING');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#6D4C41');
    this.setTooltip('Set default file encoding for FileRead, FileAppend, etc.');
  }
};

// EnvUpdate
Blockly.Blocks['ahk_env_update'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('EnvUpdate');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E53935');
    this.setTooltip('v1: Refresh the OS environment variables for the current session.');
  }
};

// ============================================
// V1 STRING LOWER / UPPER (#00897B)
// ============================================

Blockly.Blocks['ahk_string_case_v1'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['StringLower', 'L'], ['StringUpper', 'U']]), 'ACTION')
      .appendField(new Blockly.FieldTextInput('OutputVar'), 'OUTVAR')
      .appendField(',')
      .appendField(new Blockly.FieldTextInput('InputVar'), 'INVAR')
      .appendField(',')
      .appendField(new Blockly.FieldDropdown([
        ['(entire string)', ''],
        ['T: title case', 'T']
      ]), 'FLAG');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00897B');
    this.setTooltip('v1: Convert string to lower/upper case. Use T flag for title case.');
  }
};

// ============================================
// ATAN2 (#1E88E5)
// ============================================

Blockly.Blocks['ahk_atan2'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('ATan2(')
      .appendField(new Blockly.FieldNumber(1), 'Y')
      .appendField(',')
      .appendField(new Blockly.FieldNumber(0), 'X')
      .appendField(')');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Angle'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#1E88E5');
    this.setTooltip('v2: Arc tangent of Y/X. Returns angle in radians.');
  }
};

// ============================================
// ONCLIPBOARDCHANGE (#EC407A)
// ============================================

Blockly.Blocks['ahk_on_clipboard_change'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('OnClipboardChange')
      .appendField(new Blockly.FieldDropdown([['Callback', 'Callback'], ['Off', 'Off']]), 'ACTION');
    this.appendDummyInput()
      .appendField('function name:')
      .appendField(new Blockly.FieldTextInput('ClipChanged'), 'FUNC');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('v2: Register a function to run when clipboard content changes.');
  }
};

// ============================================
// FUNCTION META (#EC407A)
// ============================================

// IsLabel / IsFunc / Func
Blockly.Blocks['ahk_func_meta'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['IsLabel', 'IsLabel'],
        ['IsFunc', 'IsFunc'],
        ['Func', 'Func']
      ]), 'FN')
      .appendField(new Blockly.FieldTextInput('MyLabel'), 'NAME');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Result'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Check if a label or function exists, or get a function reference.');
  }
};

// CallbackCreate
Blockly.Blocks['ahk_callback_create'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('CallbackCreate')
      .appendField(new Blockly.FieldTextInput('MyFunction'), 'FUNCTION')
      .appendField('param count:')
      .appendField(new Blockly.FieldNumber(2), 'PARAMCOUNT');
    this.appendDummyInput()
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Callback'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Create a native callback address from a function (for DllCall).');
  }
};
