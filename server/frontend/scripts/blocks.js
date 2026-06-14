// ============================================
// AHK Builder - Block Definitions
// ============================================
// Each block is a visual building block that represents
// an AutoHotkey operation.

Blockly.defineBlocksWithJsonArray([
  // ==========================================
  // MOUSE CATEGORY
  // ==========================================

  // Mouse Click
  {
    type: 'ahk_mouse_click',
    message0: 'mouse click %1 at x: %2 y: %3 count: %4',
    args0: [
      {
        type: 'field_dropdown',
        name: 'BUTTON',
        options: [
          ['left', 'L'],
          ['right', 'R'],
          ['middle', 'M'],
          ['left double', 'LD'],
          ['right double', 'RD'],
          ['middle double', 'MD'],
        ],
      },
      {
        type: 'field_number',
        name: 'X',
        value: 0,
        min: -99999,
        max: 99999,
        precision: 1,
      },
      {
        type: 'field_number',
        name: 'Y',
        value: 0,
        min: -99999,
        max: 99999,
        precision: 1,
      },
      {
        type: 'field_number',
        name: 'COUNT',
        value: 1,
        min: 1,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#5CB85C',
    tooltip: 'Click a mouse button at a position',
    helpUrl: '',
  },

  // Mouse Move
  {
    type: 'ahk_mouse_move',
    message0: 'mouse move to x: %1 y: %2 speed: %3',
    args0: [
      {
        type: 'field_number',
        name: 'X',
        value: 100,
        min: -99999,
        max: 99999,
      },
      {
        type: 'field_number',
        name: 'Y',
        value: 100,
        min: -99999,
        max: 99999,
      },
      {
        type: 'field_dropdown',
        name: 'SPEED',
        options: [
          ['instant (0)', '0'],
          ['fast (2)', '2'],
          ['normal (5)', '5'],
          ['slow (10)', '10'],
          ['very slow (20)', '20'],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#5CB85C',
    tooltip: 'Move the mouse cursor to a position',
    helpUrl: '',
  },

  // Mouse Drag
  {
    type: 'ahk_mouse_drag',
    message0: 'mouse drag %1 from x: %2 y: %3 to x: %4 y: %5',
    args0: [
      {
        type: 'field_dropdown',
        name: 'BUTTON',
        options: [
          ['left', 'L'],
          ['right', 'R'],
          ['middle', 'M'],
        ],
      },
      {
        type: 'field_number',
        name: 'X1',
        value: 100,
      },
      {
        type: 'field_number',
        name: 'Y1',
        value: 100,
      },
      {
        type: 'field_number',
        name: 'X2',
        value: 500,
      },
      {
        type: 'field_number',
        name: 'Y2',
        value: 500,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#5CB85C',
    tooltip: 'Click and drag from one position to another',
    helpUrl: '',
  },

  // Mouse Wheel
  {
    type: 'ahk_mouse_wheel',
    message0: 'mouse wheel %1 %2 times',
    args0: [
      {
        type: 'field_dropdown',
        name: 'DIRECTION',
        options: [
          ['scroll up', 'Up'],
          ['scroll down', 'Down'],
          ['scroll left', 'Left'],
          ['scroll right', 'Right'],
        ],
      },
      {
        type: 'field_number',
        name: 'COUNT',
        value: 1,
        min: 1,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#5CB85C',
    tooltip: 'Scroll the mouse wheel',
    helpUrl: '',
  },

  // Mouse Get Position
  {
    type: 'ahk_mouse_get_pos',
    message0: 'get mouse position → var: %1',
    args0: [
      {
        type: 'field_input',
        name: 'VAR',
        text: 'MousePos',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#5CB85C',
    tooltip: 'Get current mouse cursor position',
    helpUrl: '',
  },

  // ==========================================
  // KEYBOARD CATEGORY
  // ==========================================

  // Send Keys
  {
    type: 'ahk_send',
    message0: 'send keystrokes %1',
    args0: [
      {
        type: 'field_input',
        name: 'KEYS',
        text: 'Hello World!',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#4285F4',
    tooltip: 'Send keystrokes to the active window. Use {Enter}, {Tab}, {Space} for special keys.',
    helpUrl: '',
  },

  // SendInput
  {
    type: 'ahk_send_input',
    message0: 'send input (fast) %1',
    args0: [
      {
        type: 'field_input',
        name: 'KEYS',
        text: 'Hello World!',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#4285F4',
    tooltip: 'Send keystrokes using the SendInput method (fastest)',
    helpUrl: '',
  },

  // Type Text
  {
    type: 'ahk_type_text',
    message0: 'type text %1',
    args0: [
      {
        type: 'field_input',
        name: 'TEXT',
        text: 'Hello World!',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#4285F4',
    tooltip: 'Type text character by character',
    helpUrl: '',
  },

  // Hotkey
  {
    type: 'ahk_hotkey',
    message0: 'hotkey %1 ⮕ run',
    message1: '%1',
    args0: [
      {
        type: 'field_input',
        name: 'HOTKEY',
        text: '^!s',
      },
    ],
    args1: [
      {
        type: 'input_statement',
        name: 'ACTIONS',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#4285F4',
    tooltip: 'Define a hotkey. Use ^ for Ctrl, ! for Alt, + for Shift, # for Win. Example: ^!s = Ctrl+Alt+S',
    helpUrl: '',
  },

  // Key Wait
  {
    type: 'ahk_key_wait',
    message0: 'wait for key %1',
    args0: [
      {
        type: 'field_input',
        name: 'KEY',
        text: 'Space',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#4285F4',
    tooltip: 'Wait for a key to be pressed',
    helpUrl: '',
  },

  // ==========================================
  // WINDOW CATEGORY
  // ==========================================

  // Window Activate
  {
    type: 'ahk_win_activate',
    message0: 'activate window %1',
    args0: [
      {
        type: 'field_input',
        name: 'TITLE',
        text: 'Untitled - Notepad',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#F9A825',
    tooltip: 'Activate a window by title',
    helpUrl: '',
  },

  // Window Close
  {
    type: 'ahk_win_close',
    message0: 'close window %1',
    args0: [
      {
        type: 'field_input',
        name: 'TITLE',
        text: 'Untitled - Notepad',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#F9A825',
    tooltip: 'Close a window by title',
    helpUrl: '',
  },

  // Window Minimize
  {
    type: 'ahk_win_minimize',
    message0: 'minimize window %1',
    args0: [
      {
        type: 'field_input',
        name: 'TITLE',
        text: 'Untitled - Notepad',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#F9A825',
    tooltip: 'Minimize a window',
    helpUrl: '',
  },

  // Window Maximize
  {
    type: 'ahk_win_maximize',
    message0: 'maximize window %1',
    args0: [
      {
        type: 'field_input',
        name: 'TITLE',
        text: 'Untitled - Notepad',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#F9A825',
    tooltip: 'Maximize a window',
    helpUrl: '',
  },

  // Window Move
  {
    type: 'ahk_win_move',
    message0: 'move window %1 to x: %2 y: %3 w: %4 h: %5',
    args0: [
      {
        type: 'field_input',
        name: 'TITLE',
        text: 'Untitled - Notepad',
      },
      {
        type: 'field_number',
        name: 'X',
        value: 0,
      },
      {
        type: 'field_number',
        name: 'Y',
        value: 0,
      },
      {
        type: 'field_number',
        name: 'W',
        value: 800,
      },
      {
        type: 'field_number',
        name: 'H',
        value: 600,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#F9A825',
    tooltip: 'Move and resize a window',
    helpUrl: '',
  },

  // Window Wait
  {
    type: 'ahk_win_wait',
    message0: 'wait for window %1 timeout %2s',
    args0: [
      {
        type: 'field_input',
        name: 'TITLE',
        text: 'Untitled - Notepad',
      },
      {
        type: 'field_number',
        name: 'TIMEOUT',
        value: 5,
        min: 0,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#F9A825',
    tooltip: 'Wait for a window to appear',
    helpUrl: '',
  },

  // Window Wait Active
  {
    type: 'ahk_win_wait_active',
    message0: 'wait for window %1 to become active timeout %2s',
    args0: [
      {
        type: 'field_input',
        name: 'TITLE',
        text: 'Untitled - Notepad',
      },
      {
        type: 'field_number',
        name: 'TIMEOUT',
        value: 5,
        min: 0,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#F9A825',
    tooltip: 'Wait for a window to be active',
    helpUrl: '',
  },

  // Get Active Window Title
  {
    type: 'ahk_win_get_active_title',
    message0: 'get active window title → %1',
    args0: [
      {
        type: 'field_input',
        name: 'VAR',
        text: 'ActiveTitle',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#F9A825',
    tooltip: 'Get the title of the active window into a variable',
    helpUrl: '',
  },

  // ==========================================
  // CONTROL FLOW CATEGORY
  // ==========================================

  // Loop
  {
    type: 'ahk_loop',
    message0: 'loop %1 times',
    message1: '%1',
    args0: [
      {
        type: 'field_number',
        name: 'COUNT',
        value: 10,
        min: 1,
      },
    ],
    args1: [
      {
        type: 'input_statement',
        name: 'ACTIONS',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#AB47BC',
    tooltip: 'Repeat actions a certain number of times',
    helpUrl: '',
  },

  // While
  {
    type: 'ahk_while',
    message0: 'while %1',
    message1: '%1',
    args0: [
      {
        type: 'field_input',
        name: 'CONDITION',
        text: 'A_Index < 10',
      },
    ],
    args1: [
      {
        type: 'input_statement',
        name: 'ACTIONS',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#AB47BC',
    tooltip: 'Loop while a condition is true',
    helpUrl: '',
  },

  // Sleep
  {
    type: 'ahk_sleep',
    message0: 'sleep %1 ms',
    args0: [
      {
        type: 'field_number',
        name: 'MS',
        value: 1000,
        min: 1,
        max: 86400000,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#AB47BC',
    tooltip: 'Pause the script for a number of milliseconds',
    helpUrl: '',
  },

  // Run
  {
    type: 'ahk_run',
    message0: 'run %1',
    args0: [
      {
        type: 'field_input',
        name: 'TARGET',
        text: 'notepad.exe',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#AB47BC',
    tooltip: 'Run a program or open a file/folder',
    helpUrl: '',
  },

  // Run Wait
  {
    type: 'ahk_run_wait',
    message0: 'run %1 and wait for it to close',
    args0: [
      {
        type: 'field_input',
        name: 'TARGET',
        text: 'notepad.exe',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#AB47BC',
    tooltip: 'Run a program and wait for it to close before continuing',
    helpUrl: '',
  },

  // Wait for Pixel
  {
    type: 'ahk_wait_pixel',
    message0: 'wait for pixel %1 at x: %2 y: %3 timeout %4s',
    args0: [
      {
        type: 'field_colour',
        name: 'COLOR',
        colour: '#000000',
      },
      {
        type: 'field_number',
        name: 'X',
        value: 0,
      },
      {
        type: 'field_number',
        name: 'Y',
        value: 0,
      },
      {
        type: 'field_number',
        name: 'TIMEOUT',
        value: 5,
        min: 0,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#AB47BC',
    tooltip: 'Wait for a specific pixel color to appear on screen',
    helpUrl: '',
  },

  // ==========================================
  // VARIABLES CATEGORY
  // ==========================================

  // Set Variable
  {
    type: 'ahk_set_variable',
    message0: 'set %1 = %2',
    args0: [
      {
        type: 'field_input',
        name: 'VAR',
        text: 'MyVar',
      },
      {
        type: 'field_input',
        name: 'VALUE',
        text: '0',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#E53935',
    tooltip: 'Set a variable to a value',
    helpUrl: '',
  },

  // Get Variable (expression block)
  {
    type: 'ahk_get_variable',
    message0: '%1',
    args0: [
      {
        type: 'field_input',
        name: 'VAR',
        text: 'MyVar',
      },
    ],
    output: null,
    colour: '#E53935',
    tooltip: 'Get a variable value (for expressions)',
    helpUrl: '',
  },

  // Math Expression
  {
    type: 'ahk_math_expression',
    message0: 'set %1 = %2 %3 %4',
    args0: [
      {
        type: 'field_input',
        name: 'VAR',
        text: 'Result',
      },
      {
        type: 'field_number',
        name: 'A',
        value: 0,
      },
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['+', '+'],
          ['-', '-'],
          ['×', '*'],
          ['÷', '/'],
          ['mod', 'Mod'],
          ['** (power)', '**'],
        ],
      },
      {
        type: 'field_number',
        name: 'B',
        value: 0,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#E53935',
    tooltip: 'Perform a math calculation and store the result',
    helpUrl: '',
  },

  // String Concat
  {
    type: 'ahk_string_concat',
    message0: 'set %1 = %2 + %3',
    args0: [
      {
        type: 'field_input',
        name: 'VAR',
        text: 'FullName',
      },
      {
        type: 'field_input',
        name: 'A',
        text: 'Hello ',
      },
      {
        type: 'field_input',
        name: 'B',
        text: 'World',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#E53935',
    tooltip: 'Concatenate (join) two strings',
    helpUrl: '',
  },

  // Clipboard
  {
    type: 'ahk_clipboard',
    message0: 'clipboard %1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'ACTION',
        options: [
          ['set text', 'set'],
          ['get text to var', 'get'],
          ['clear', 'clear'],
        ],
      },
    ],
    message1: '%1',
    args1: [
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'String',
        align: 'RIGHT',
      },
    ],
    message2: '→ store in %1',
    args2: [
      {
        type: 'field_input',
        name: 'VAR',
        text: 'ClipContent',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#E53935',
    tooltip: 'Manipulate the clipboard. "get text to var" stores clipboard into a variable.',
    helpUrl: '',
  },

  // ==========================================
  // DIALOG CATEGORY
  // ==========================================

  // MsgBox
  {
    type: 'ahk_msgbox',
    message0: 'message box: %1 type: %2 title: %3',
    args0: [
      {
        type: 'field_input',
        name: 'TEXT',
        text: 'Hello World!',
      },
      {
        type: 'field_dropdown',
        name: 'TYPE',
        options: [
          ['OK (0)', '0'],
          ['OK Cancel (1)', '1'],
          ['Abort Retry Ignore (2)', '2'],
          ['Yes No Cancel (3)', '3'],
          ['Yes No (4)', '4'],
          ['Retry Cancel (5)', '5'],

        ],
      },
      {
        type: 'field_input',
        name: 'TITLE',
        text: 'AHK Builder',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#546E7A',
    tooltip: 'Show a message box dialog',
    helpUrl: '',
  },

  // InputBox
  {
    type: 'ahk_inputbox',
    message0: 'input box prompt: %1 title: %2 → var: %3',
    args0: [
      {
        type: 'field_input',
        name: 'PROMPT',
        text: 'Enter your name:',
      },
      {
        type: 'field_input',
        name: 'TITLE',
        text: 'Input',
      },
      {
        type: 'field_input',
        name: 'VAR',
        text: 'UserInput',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#546E7A',
    tooltip: 'Show an input box to get user input',
    helpUrl: '',
  },

  // ToolTip
  {
    type: 'ahk_tooltip',
    message0: 'tooltip: %1 at x: %2 y: %3',
    args0: [
      {
        type: 'field_input',
        name: 'TEXT',
        text: 'Hello!',
      },
      {
        type: 'field_number',
        name: 'X',
        value: 0,
      },
      {
        type: 'field_number',
        name: 'Y',
        value: 0,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#546E7A',
    tooltip: 'Show a tooltip near the mouse cursor',
    helpUrl: '',
  },

  // Splash Text
  {
    type: 'ahk_splash_text',
    message0: 'splash text: %1 for %2 seconds',
    args0: [
      {
        type: 'field_input',
        name: 'TEXT',
        text: 'Working...',
      },
      {
        type: 'field_number',
        name: 'SECONDS',
        value: 2,
        min: 1,
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#546E7A',
    tooltip: 'Show a splash text overlay on screen',
    helpUrl: '',
  },

  // ==========================================
  // FILE CATEGORY
  // ==========================================

  // File Append
  {
    type: 'ahk_file_append',
    message0: 'append to file %1 text: %2',
    args0: [
      {
        type: 'field_input',
        name: 'FILEPATH',
        text: 'C:\\log.txt',
      },
      {
        type: 'field_input',
        name: 'TEXT',
        text: 'Hello World!`n',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#6D4C41',
    tooltip: 'Append text to a file',
    helpUrl: '',
  },

  // File Read
  {
    type: 'ahk_file_read',
    message0: 'read file %1 → var: %2',
    args0: [
      {
        type: 'field_input',
        name: 'FILEPATH',
        text: 'C:\\data.txt',
      },
      {
        type: 'field_input',
        name: 'VAR',
        text: 'FileContent',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#6D4C41',
    tooltip: 'Read the contents of a file into a variable',
    helpUrl: '',
  },

  // File Delete
  {
    type: 'ahk_file_delete',
    message0: 'delete file %1',
    args0: [
      {
        type: 'field_input',
        name: 'FILEPATH',
        text: 'C:\\temp.txt',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#6D4C41',
    tooltip: 'Delete a file',
    helpUrl: '',
  },

  // File Copy
  {
    type: 'ahk_file_copy',
    message0: 'copy file %1 to %2',
    args0: [
      {
        type: 'field_input',
        name: 'SOURCE',
        text: 'C:\\source.txt',
      },
      {
        type: 'field_input',
        name: 'DEST',
        text: 'C:\\backup.txt',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#6D4C41',
    tooltip: 'Copy a file from source to destination',
    helpUrl: '',
  },

  // ==========================================
  // ACTIONS CATEGORY
  // ==========================================

  // Comment
  {
    type: 'ahk_comment',
    message0: '// %1',
    args0: [
      {
        type: 'field_input',
        name: 'TEXT',
        text: 'Your comment here',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#EC407A',
    tooltip: 'Add a comment to your script',
    helpUrl: '',
  },

  // MsgBox Info
  {
    type: 'ahk_msgbox_info',
    message0: 'info: %1',
    args0: [
      {
        type: 'field_input',
        name: 'TEXT',
        text: 'Script finished!',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#EC407A',
    tooltip: 'Show a friendly info message',
    helpUrl: '',
  },

  // Exit App
  {
    type: 'ahk_exit',
    message0: 'exit script',
    previousStatement: null,
    colour: '#EC407A',
    tooltip: 'Exit the script',
    helpUrl: '',
  },

  // Reload
  {
    type: 'ahk_reload',
    message0: 'reload script',
    previousStatement: null,
    colour: '#EC407A',
    tooltip: 'Reload the current script',
    helpUrl: '',
  },

  // Send Email (simple)
  {
    type: 'ahk_send_email',
    message0: 'send email to: %1 subject: %2 body: %3',
    args0: [
      {
        type: 'field_input',
        name: 'TO',
        text: 'user@example.com',
      },
      {
        type: 'field_input',
        name: 'SUBJECT',
        text: 'Hello from AHK',
      },
      {
        type: 'field_input',
        name: 'BODY',
        text: 'This is an automated message.',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: '#EC407A',
    tooltip: 'Send an email (requires CDO.Message COM setup; may need additional configuration)',
    helpUrl: '',
  },
]);

// ============================================
// NEW: IMAGE SEARCH CATEGORY
// ============================================

// Image Search
Blockly.Blocks['ahk_image_search'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('search for image')
      .appendField(new Blockly.FieldTextInput('C:\\image.bmp'), 'IMAGE');
    this.appendDummyInput()
      .appendField('in region x:')
      .appendField(new Blockly.FieldNumber(0), 'X1')
      .appendField('y:')
      .appendField(new Blockly.FieldNumber(0), 'Y1')
      .appendField('to x:')
      .appendField(new Blockly.FieldNumber(1920), 'X2')
      .appendField('y:')
      .appendField(new Blockly.FieldNumber(1080), 'Y2');
    this.appendDummyInput()
      .appendField('store pos in var:')
      .appendField(new Blockly.FieldTextInput('FoundPos'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00BCD4');
    this.setTooltip('Search for an image on screen. Stores X,Y in FoundPosX, FoundPosY. Sets ErrorLevel.');
  }
};

// Pixel Search
Blockly.Blocks['ahk_pixel_search'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('search for pixel')
      .appendField(new Blockly.FieldColour('#000000'), 'COLOR');
    this.appendDummyInput()
      .appendField('in region x:')
      .appendField(new Blockly.FieldNumber(0), 'X1')
      .appendField('y:')
      .appendField(new Blockly.FieldNumber(0), 'Y1')
      .appendField('to x:')
      .appendField(new Blockly.FieldNumber(1920), 'X2')
      .appendField('y:')
      .appendField(new Blockly.FieldNumber(1080), 'Y2');
    this.appendDummyInput()
      .appendField('variation:')
      .appendField(new Blockly.FieldNumber(0, 0, 255), 'VARIATION');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#00BCD4');
    this.setTooltip('Search for a pixel color within a region. Stores X,Y in PixelX, PixelY. Sets ErrorLevel.');
  }
};

// ==========================================
// NEW: SOUND CATEGORY
// ==========================================

// SoundBeep
Blockly.Blocks['ahk_sound_beep'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('beep frequency:')
      .appendField(new Blockly.FieldNumber(523, 37, 32767), 'FREQ')
      .appendField('Hz duration:')
      .appendField(new Blockly.FieldNumber(200, 1, 10000), 'DURATION')
      .appendField('ms');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#FF6F00');
    this.setTooltip('Beep at a frequency. 523 Hz = middle C, 200ms = short beep.');
  }
};

// SoundPlay
Blockly.Blocks['ahk_sound_play'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('play sound file')
      .appendField(new Blockly.FieldTextInput('C:\\alert.wav'), 'FILE');
    this.appendDummyInput()
      .appendField('wait:')
      .appendField(new Blockly.FieldCheckbox(true), 'WAIT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#FF6F00');
    this.setTooltip('Play a sound file. Check wait to wait for sound to finish.');
  }
};

// ==========================================
// NEW: WINDOW EXTRA
// ==========================================

// WinExist
Blockly.Blocks['ahk_win_exist'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('window exists?')
      .appendField(new Blockly.FieldTextInput('Untitled - Notepad'), 'TITLE');
    this.setOutput(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Check if a window exists. Returns window handle or 0.');
  }
};

// WinGetPos
Blockly.Blocks['ahk_win_get_pos'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('get window')
      .appendField(new Blockly.FieldTextInput('A'), 'TITLE')
      .appendField('position');
    this.appendDummyInput()
      .appendField('→ x:')
      .appendField(new Blockly.FieldTextInput('WinX'), 'VARX')
      .appendField('y:')
      .appendField(new Blockly.FieldTextInput('WinY'), 'VARY')
      .appendField('w:')
      .appendField(new Blockly.FieldTextInput('WinW'), 'VARW')
      .appendField('h:')
      .appendField(new Blockly.FieldTextInput('WinH'), 'VARH');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#F9A825');
    this.setTooltip('Get position and size of a window. Use "A" for active window.');
  }
};

// ==========================================
// NEW: CONTROL FLOW EXTRA
// ===========================================

// Break
Blockly.Blocks['ahk_break'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('break loop');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#AB47BC');
    this.setTooltip('Exit the current loop immediately.');
  }
};

// Continue
Blockly.Blocks['ahk_continue'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('continue loop');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#AB47BC');
    this.setTooltip('Skip to the next iteration of the loop.');
  }
};

// ==========================================
// NEW: VARIABLES EXTRA
// ===========================================

// Random
Blockly.Blocks['ahk_random'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('random')
      .appendField(new Blockly.FieldNumber(1), 'MIN')
      .appendField('to')
      .appendField(new Blockly.FieldNumber(100), 'MAX')
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('Rand'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E53935');
    this.setTooltip('Generate a random number between min and max.');
  }
};

// EnvGet
Blockly.Blocks['ahk_env_get'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('get env')
      .appendField(new Blockly.FieldTextInput('PATH'), 'ENVVAR')
      .appendField('→')
      .appendField(new Blockly.FieldTextInput('EnvValue'), 'VAR');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E53935');
    this.setTooltip('Get an environment variable value.');
  }
};

// EnvSet
Blockly.Blocks['ahk_env_set'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('set env')
      .appendField(new Blockly.FieldTextInput('MyVar'), 'ENVVAR')
      .appendField('=')
      .appendField(new Blockly.FieldTextInput('My Value'), 'VALUE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#E53935');
    this.setTooltip('Set an environment variable.');
  }
};

// ==========================================
// NEW: ACTIONS EXTRA
// ===========================================

// Process
Blockly.Blocks['ahk_process'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('process')
      .appendField(new Blockly.FieldDropdown([
        ['close', 'Close'],
        ['wait for', 'Wait'],
        ['wait for close', 'WaitClose'],
        ['exists?', 'Exist'],
        ['set priority', 'Priority']
      ]), 'ACTION');
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput('notepad.exe'), 'PROCESS');
    this.appendDummyInput()
      .appendField('timeout:')
      .appendField(new Blockly.FieldNumber(5, 0), 'TIMEOUT')
      .appendField('s');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Manage processes: close, wait, check existence, or set priority.');
  }
};

// BlockInput
Blockly.Blocks['ahk_block_input'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('block user input')
      .appendField(new Blockly.FieldDropdown([
        ['on', 'On'],
        ['off', 'Off'],
        ['send mouse', 'SendMouse'],
        ['send keyboard', 'SendKeyboard']
      ]), 'MODE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('#EC407A');
    this.setTooltip('Block or unblock user input (mouse/keyboard).');
  }
};

// ============================================
// Additional setup for the built-in If block
// ============================================

// We use the built-in 'controls_if' block from Blockly core
// Add an AHK-specific mutation for it later in the generator
