<?php

/**
 * The primary PHP file for bs4theme theme.
 */

/*
*
*/

/**
 * Implements hook_css_alter().
 */
function bs4theme_css_alter(&$css)
{
    // Отключаем системные стили кроме colorbox и стилей темы
    // foreach ($css as $key => $value) {
    //   if ((strpos($key,"colorbox") === false) && (strpos($key,"themes") === false)) unset($css[$key]);
    // }

    // Сортируем файлы функцией drupal_sort_css_js().
    uasort($css, 'drupal_sort_css_js');
    $i = 0;
    foreach ($css as $name => $style) {
        $css[$name]['weight'] = $i++;
        // Все файлы помещаем в группу CSS_DEFAULT
        $css[$name]['group'] = CSS_DEFAULT;
        $css[$name]['every_page'] = FALSE;
    }
}
/**
 * Implements hook_js_alter().
 */
function bs4theme_js_alter(&$javascript)
{
    // Сортируем файлы функцией drupal_sort_css_js().
    uasort($javascript, 'drupal_sort_css_js');
    $i = 0;
    foreach ($javascript as $name => $script) {
        $javascript[$name]['weight'] = $i++;
        // Все файлы помещаем в группу JS_DEFAULT
        $javascript[$name]['group'] = JS_DEFAULT;
        $javascript[$name]['every_page'] = FALSE;
    }
}

/* Удалить все атрибуты type='text/javascript' и type="text/css" */
function bs4theme_process_html_tag(&$variables)
{
    $el = &$variables['element'];
    if (isset($el['#attributes']['type']) && $el['#attributes']['type'] == 'text/css') {
        unset($el['#attributes']['type']);
    }
    if (isset($el['#attributes']['type']) && $el['#attributes']['type'] == 'text/javascript') {
        unset($el['#attributes']['type']);
    }
}

/** Главная навигация сайта */
function bs4theme_menu_tree__main_menu($variables)
{
    return '<ul class="main-menu">' . $variables['tree'] . '</ul>';
}

function bs4theme_menu_link__main_menu(array $variables)
{
    $element = $variables['element'];
    $sub_menu = '';
    $unfold_toggle = false;

    $element['#attributes']['class'][] = 'main-menu__item';
    $element['#localized_options']['attributes']['class'][] = 'main-menu__link';

    // This is the part that removes or changes the 'leaf' class.
    if (!empty($element['#attributes']['class'])) {
        foreach ($element['#attributes']['class'] as $key => $class) {
            if ($class == 'leaf' || $class == 'expanded' || $class == 'active-trail' || $class == 'collapsed' || $class == 'first' || $class == 'last') {
                // To remove the 'leaf' or 'expanded' classes.
                unset($element['#attributes']['class'][$key]);
            };
            if ($class == 'unfold') {
                // Пункт с выподающими подпунктами.
                $element['#attributes']['class'][$key] = 'folder';
                $unfold_toggle = true;
            }
        }
    }
    if ($element['#below']) {
        $folder_menu = str_replace('<ul class="main-menu">', '<ul class="folder__menu">', drupal_render($element['#below']));

        $sub_menu = '<div class="folder__wrap">' . $folder_menu . '</div>';
    }
    if ($unfold_toggle) {
        $output = '<button class="main-menu__link folder__toggle" type="button">' . $element['#title'] . '</button>';
    } else {
        $output = l($element['#title'], $element['#href'], $element['#localized_options']);
    }
    return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>\n";
    // return '<div>' . print_r($element) . '</div>';
}

/*
* Темизация полей
*/

/*-------- по умолчанию ---------------*/
function bs4theme_field($variables)
{
    $output = '';

    // Render the label, if it's not hidden.
    if (!$variables['label_hidden']) {
        $output .= '<div class="field-label"' . $variables['title_attributes'] . '>' . $variables['label'] . ':&nbsp;</div>';
    }

    // Render the items.
    foreach ($variables['items'] as $delta => $item) {
        $output .= '<div class="field-item" ' . $variables['item_attributes'][$delta] . '>' . drupal_render($item) . '</div>';
    }

    // Render the top-level DIV.
    $output = '<div class="bs4theme ' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';

    /**
     *  paragraphs_items
     */
    if ($variables['element']['#entity_type'] == 'paragraphs_item') {
        $output = '';
        $class = str_replace('field-', 'content__', str_replace('_', '-', $variables['element']['#field_name']));
        foreach ($variables['items'] as $item) {
            $output .= drupal_render($item);
        }
        $output = '<div class="' . $class . '">' . $output . '</div>';
    }
    return $output;
}

/*-------- ЛОКАЛЬНОЕ МЕНЮ-----------------------------------------------------*/
function bs4theme_double_field($vars)
{
    $element = $vars['element'];
    $output = '<a class="local-menu__link nav-link" href="#' . $element['#item']['second'] . '">' . str_replace(':', '', $element['#item']['first']) . '</a>';
    return $output;
}
function bs4theme_field__field_local_menu($variables)
{
    $output = '';
    // Render the items.
    foreach ($variables['items'] as $delta => $item) {
        $output .= '<li class="local-menu__item" ' . $variables['item_attributes'][$delta] . '>' . render($item) . '</li>';
    }
    // Render the top-level DIV.
    $output = '<ul class="local-menu"' . $variables['attributes'] . '>' . $output . '</ul>';
    return $output;
}

/*--------- body -------------------------------------------------------------*/
function bs4theme_field__body($variables)
{
    $output = '';

    foreach ($variables['items'] as $delta => $item) {
        $output .= drupal_render($item);
    }
    return $output;
}
/*--------- field_paragraphs -------------------------------------------------*/
function bs4theme_field__field_paragraphs($variables)
{
    $output = '';
    if (!$variables['label_hidden']) {
        $output .= '<div class="content__label"' . $variables['title_attributes'] . '>' . $variables['label'] . ':&nbsp;</div>';
    }
    foreach ($variables['items'] as $delta => $item) {
        $output .= '<section class="content__section "' . $variables['item_attributes'][$delta] . '>' . drupal_render($item) . '</section>';
        // $output .= '<pre>' . print_r($item) . '</pre>';
    }
    return $output;
}

/*-------- content__gallery --------------*/
function bs4theme_field__field_prewiews($variables)
{
    $output = '';

    foreach ($variables['items'] as $delta => $item) {
        $output .= drupal_render($item);
    }
    $output = '<div class="content__gallery"' . $variables['attributes'] . '>' . $output . '</div>';
    return $output;
}

/*---------- field_3col_images ----------------------*/
function bs4theme_field__field_3col_images($variables)
{
    $output = '';
    if (!$variables['label_hidden']) {
        $output .= '<div class="field-label"' . $variables['title_attributes'] . '>' . $variables['label'] . ':&nbsp;</div>';
    }
    foreach ($variables['items'] as $delta => $item) {
        $output .= '<div class="col px-2">' . drupal_render($item) . '</div>';
    }
    $output = '<div class="row  row-cols-1 row-cols-sm-2 row-cols-md-3 ' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';
    return $output;
}

/*--------- field_banner -------------------------------------------------*/
function bs4theme_field__field_banner($variables)
{
    $output = '';

    // Render the label, if it's not hidden.
    if (!$variables['label_hidden']) {
        $output .= '<div class="field-label"' . $variables['title_attributes'] . '>' . $variables['label'] . ':&nbsp;</div>';
    }

    // Render the items.
    $output .= '<div class="field-items"' . $variables['content_attributes'] . '>';
    foreach ($variables['items'] as $delta => $item) {
        $classes = 'field-item ' . ($delta % 2 ? 'odd' : 'even');
        $output .= '<div class="' . $classes . '"' . $variables['item_attributes'][$delta] . '>' . drupal_render($item) . '</div>';
    }
    $output .= '</div>';

    // Render the top-level DIV.
    $output = '<div class="' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';
    $output .= '<div class="title-clone container h1">' . drupal_get_title() . '</div>';
    return $output;
}

/*
* Темизация вкладок редактирования материала
*/

function bs4theme_menu_local_task($variables)
{
    $link = $variables['element']['#link'];
    $link_text = $link['title'];
    if (!empty($variables['element']['#active'])) {

        // Add text to indicate active tab for non-visual users.
        $active = '<span class="element-invisible">' . t('(active tab)') . '</span>';

        // If the link does not contain HTML already, check_plain() it now.
        // After we set 'html'=TRUE the link will not be sanitized by l().
        if (empty($link['localized_options']['html'])) {
            $link['title'] = check_plain($link['title']);
        }
        $link['localized_options']['html'] = TRUE;
        $link_text = t('!local-task-title!active', array(
            '!local-task-title' => $link['title'],
            '!active' => $active,
        ));
    }
    $link['localized_options']['attributes']['class'][] = 'nav-link';
    return '<li' . (!empty($variables['element']['#active']) ? ' class="nav-item active"' : ' class="nav-item"') . '>' . l($link_text, $link['href'], $link['localized_options']) . "</li>\n";
}

function bs4theme_menu_local_tasks(&$variables)
{
    $output = '';
    if (!empty($variables['primary'])) {
        $output .= '<ul class="nav">' . drupal_render($variables['primary']) . '</ul>';
    }
    if (!empty($variables['secondary'])) {
        $output .= '<ul class="nav">' . drupal_render($variables['secondary']) . '</ul>';
    }
    return $output;
}

function bs4theme_menu_local_action($variables)
{
    $link = $variables['element']['#link'];
    $link['localized_options']['attributes']['class'][] = 'nav-link';
    $output = '<li class="nav-item">';
    if (isset($link['href'])) {
        $output .= l($link['title'], $link['href'], isset($link['localized_options']) ? $link['localized_options'] : array('attributes' => array('class' => 'nav-link')));
    } elseif (!empty($link['localized_options']['html'])) {
        $output .= $link['title'];
    } else {
        $output .= check_plain($link['title']);
    }
    $output .= "</li>\n";
    return $output;
}

/**
 * -------------------------------------------------
 * ------------- Темизация форм --------------------
 * -------------------------------------------------
 */


/**
 *  form_alter
 */
function bs4theme_form_alter(&$form, &$form_state, $form_id)
{
    // drupal_set_message($form_id);
    switch ($form_id) {
        case 'webform_client_form_74':
            $form['#attributes']['autocomplete'] = 'off';
            $form['#attributes']['class'][0] = 'webform';
            $form['actions']['submit']['#attributes']['class'] = [];
            $form['actions']['submit']['#value'] = 'Отправить заказ в типографию';
            break;
    }
    // drupal_set_message('<pre>'.print_r($form['actions'], TRUE).'</pre>');
}

/**
 * Returns HTML for a form
 */
function bs4theme_form($variables)
{
    $element = $variables['element'];
    if (isset($element['#action'])) {
        $element['#attributes']['action'] = drupal_strip_dangerous_protocols($element['#action']);
    }
    element_set_attributes($element, array(
        'method',
        'id',
    ));
    if (empty($element['#attributes']['accept-charset'])) {
        $element['#attributes']['accept-charset'] = "UTF-8";
    }

    // Anonymous DIV to satisfy XHTML compliance.
    // return '<form' . drupal_attributes($element['#attributes']) . '><div>' . $element['#children'] . '</div></form>';
    return '<form' . drupal_attributes($element['#attributes']) . '>' . $element['#children'] . '</form>';
}

/**
 * Returns HTML for a webform element.
 *
 * @see theme_webform_element()
 */
function bs4theme_webform_element($variables)
{
    $element = $variables['element'];

    unset($element['#wrapper_attributes']['class'][0]);  // remove 'form-item'
    unset($element['#wrapper_attributes']['class'][2]);  // remove 'webform-component-$type'

    $output = '<div ' . drupal_attributes($element['#wrapper_attributes']) . '>' . "\n";
    $prefix = isset($element['#field_prefix']) ? '<div class="input-group"><div class="input-group-prepend"><span class="input-group-text">' . webform_filter_xss($element['#field_prefix']) . '</span></div> ' : '';
    $suffix = isset($element['#field_suffix']) ? ' <span class="field-suffix">' . webform_filter_xss($element['#field_suffix']) . '</span>' : '';
    if (isset($element['#field_prefix'])) $suffix .= '</div>';

    // Generate description for above or below the field.
    $above = !empty($element['#webform_component']['extra']['description_above']);
    $description = array(
        FALSE => '',
        TRUE => !empty($element['#description']) ? ' <div class="description">' . $element['#description'] . "</div>\n" : '',
    );

    // If #children does not contain an element with a matching @id, do not
    // include @for in the label.
    if (isset($variables['element']['#id']) && strpos($element['#children'], ' id="' . $variables['element']['#id'] . '"') === FALSE) {
        $variables['element']['#id'] = NULL;
    }

    // Determine whether or not this element has form control children. If so and
    // if webform_fieldset_wrap is TRUE, wrap them in a fieldset and use legend
    // instead of label.
    $has_element_children = FALSE;
    if (webform_variable_get('webform_fieldset_wrap')) {
        foreach (array_keys($element) as $key) {
            if (substr($key, 0, 1) !== '#') {
                $has_element_children = TRUE;
                break;
            }
        }
    }

    if ($has_element_children) {
        $output .= '<fieldset class="fieldset-invisible">';
    }

    switch ($element['#title_display']) {
        case 'inline':
            $output .= $description[$above];
            $description[$above] = '';
        case 'before':
        case 'invisible':
        case 'after':
            if ($has_element_children) {
                $title = '<legend>' . $element['#title'];

                if ($element['#required']) {
                    $title .= ' ' . theme('form_required_marker', $variables);
                }

                $title .= '</legend>';
            } else {
                $title = ' ' . theme('form_element_label', $variables);
            }
            break;
    }

    $children = ' ' . $description[$above] . $prefix . $element['#children'] . $suffix;
    switch ($element['#title_display']) {
        case 'inline':
        case 'before':
        case 'invisible':
            $output .= $title;
            $output .= $children;
            break;

        case 'after':
            $output .= $children;
            $output .= $title;
            break;

        case 'none':
        case 'attribute':
            // Output no label and no required marker, only the children.
            $output .= $children;
            break;
    }
    $output .= "\n";

    $output .= $description[!$above];

    if ($has_element_children) {
        $output .= '</fieldset>';
    }

    $output .= "</div>\n";

    return $output;
}

/**
 *  fieldset
 */
function bs4theme_fieldset($variables)
{
    $element = $variables['element'];
    // drupal_set_message('<pre>' . print_r($element['#attributes'], TRUE) . '</pre>');

    element_set_attributes($element, array('id'));

    if (in_array('hidden-on-start', $element['#attributes']['class'])) {
        $output = '<fieldset' . drupal_attributes($element['#attributes']) . ' style="display: none">';
    } else {
        $output = '<fieldset' . drupal_attributes($element['#attributes']) . '>';
    }

    if (!empty($element['#title'])) {
        $output .= '<legend>' . $element['#title'] . '</legend>';
    }
    if (!empty($element['#description'])) {
        $output .= '<div class="fieldset-description">' . $element['#description'] . '</div>';
    }
    $output .= $element['#children'];
    if (isset($element['#value'])) {
        $output .= $element['#value'];
    }
    $output .= "</fieldset>\n";

    return $output;
}

/**
 * Theme function to render textfield.
 */
function bs4theme_textfield($variables)
{
    $element = $variables['element'];

    $element['#attributes']['type'] = 'text';
    element_set_attributes($element, array('id', 'name', 'value', 'maxlength'));
    _form_set_class($element, array('form-control'));

    $extra = '';
    if ($element['#autocomplete_path'] && !empty($element['#autocomplete_input'])) {
        drupal_add_library('system', 'drupal.autocomplete');
        $element['#attributes']['class'][] = 'form-autocomplete';

        $attributes = array();
        $attributes['type'] = 'hidden';
        $attributes['id'] = $element['#autocomplete_input']['#id'];
        $attributes['value'] = $element['#autocomplete_input']['#url_value'];
        $attributes['disabled'] = 'disabled';
        $attributes['class'][] = 'autocomplete';
        $extra = '<input' . drupal_attributes($attributes) . ' />';
    }

    $output = '<input' . drupal_attributes($element['#attributes']) . ' />';

    return $output . $extra;
}

/**
 * Returns HTML for a select form element.
 */
function bs4theme_select($variables)
{
    $element = $variables['element'];
    element_set_attributes($element, array('id', 'name', 'size'));
    _form_set_class($element, array('form-select', 'custom-select'));

    return '<select' . drupal_attributes($element['#attributes']) . '>' . form_select_options($element) . '</select>';
}
/**
 * Returns HTML for a set of checkbox form elements.
 */
function bs4theme_checkboxes($variables)
{
    $element = $variables['element'];
    $attributes = array();
    if (isset($element['#id'])) {
        $attributes['id'] = $element['#id'];
    }
    $attributes['class'][] = 'form-checkboxes';
    // $attributes['class'][] = 'custom-control';
    // $attributes['class'][] = 'custom-checkbox';
    if (!empty($element['#attributes']['class'])) {
        $attributes['class'] = array_merge($attributes['class'], $element['#attributes']['class']);
    }
    if (isset($element['#attributes']['title'])) {
        $attributes['title'] = $element['#attributes']['title'];
    }
    return '<div' . drupal_attributes($attributes) . '>' . (!empty($element['#children']) ? $element['#children'] : '') . '</div>';
}
/**
 * Returns HTML for a checkbox form element.
 */
function bs4theme_checkbox($variables)
{
    $element = $variables['element'];
    $element['#attributes']['type'] = 'checkbox';
    element_set_attributes($element, array('id', 'name', '#return_value' => 'value'));

    // Unchecked checkbox has #value of integer 0.
    if (!empty($element['#checked'])) {
        $element['#attributes']['checked'] = 'checked';
    }
    _form_set_class($element, array('custom-control-input'));

    return '<input' . drupal_attributes($element['#attributes']) . ' />';
}
/**
 * Returns HTML for a radio button form element.
 */
function bs4theme_radio($variables)
{
    $element = $variables['element'];
    $element['#attributes']['type'] = 'radio';
    element_set_attributes($element, array('id', 'name', '#return_value' => 'value'));

    if (isset($element['#return_value']) && $element['#value'] !== FALSE && $element['#value'] == $element['#return_value']) {
        $element['#attributes']['checked'] = 'checked';
    }
    _form_set_class($element, array('form-radio', 'custom-control-input'));

    return '<input' . drupal_attributes($element['#attributes']) . ' />';
}

/**
 * Returns HTML for a set of radio button form elements.
 */
function bs4theme_radios($variables)
{
    $element = $variables['element'];
    $attributes = array();
    if (isset($element['#id'])) {
        $attributes['id'] = $element['#id'];
    }
    $attributes['class'] = 'form-radios';
    if (!empty($element['#attributes']['class'])) {
        $attributes['class'] .= ' ' . implode(' ', $element['#attributes']['class']);
    }
    if (isset($element['#attributes']['title'])) {
        $attributes['title'] = $element['#attributes']['title'];
    }
    return '<div' . drupal_attributes($attributes) . '>' . (!empty($element['#children']) ? $element['#children'] : '') . '</div>';
}

/**
 * Returns HTML for a form element label and required marker.
 */
function bs4theme_form_element_label($variables)
{
    $element = $variables['element'];
    //  kpr($element);
    // This is also used in the installer, pre-database setup.
    $t = get_t();

    // If title and required marker are both empty, output no label.
    if ((!isset($element['#title']) || $element['#title'] === '') && empty($element['#required'])) {
        return '';
    }

    // If the element is required, a required marker is appended to the label.
    $required = !empty($element['#required']) ? theme('form_required_marker', array('element' => $element)) : '';

    $title = filter_xss_admin($element['#title']);

    $attributes = array();
    // Style the label as class option to display inline with the element.
    if ($element['#title_display'] == 'after') {
        $attributes['class'] = 'option';
        $attributes['class'] = 'custom-control-label';
    }
    // Show label only to screen readers to avoid disruption in visual flows.
    elseif ($element['#title_display'] == 'invisible') {
        $attributes['class'] = 'element-invisible';
    }

    if (!empty($element['#id'])) {
        $attributes['for'] = $element['#id'];
    }

    // The leading whitespace helps visually separate fields from inline labels.
    return ' <label' . drupal_attributes($attributes) . '>' . $t('!title !required', array('!title' => $title, '!required' => $required)) . "</label>\n";
}
/**
 * Theme function to render an email component.
 */
function bs4theme_webform_email($variables)
{
    $element = $variables['element'];

    // This IF statement is mostly in place to allow our tests to set type="text"
    // because SimpleTest does not support type="email".
    if (!isset($element['#attributes']['type'])) {
        $element['#attributes']['type'] = 'email';
    }

    // Convert properties to attributes on the element if set.
    foreach (array('id', 'name', 'value', 'size') as $property) {
        if (isset($element['#' . $property]) && $element['#' . $property] !== '') {
            $element['#attributes'][$property] = $element['#' . $property];
        }
    }
    _form_set_class($element, array('form-control', 'form-email'));

    return '<input' . drupal_attributes($element['#attributes']) . ' />';
}

/**
 * Returns HTML for a button form element.
 */
function bs4theme_button(array $variables)
{
    $element = $variables['element'];
    $element['#attributes']['type'] = 'submit';
    element_set_attributes($element, array(
        'id',
        'name',
        'value',
    ));
    $element['#attributes']['class'][] = 'form-' . $element['#button_type'];
    if (!empty($element['#attributes']['disabled'])) {
        $element['#attributes']['class'][] = 'form-button-disabled';
    }
    return '<input' . drupal_attributes($element['#attributes']) . ' />';
}

/**
 * Returns HTML for a file upload form element.
 */
function bs4theme_file($variables)
{
    $element = $variables['element'];
    $element['#attributes']['type'] = 'file';
    element_set_attributes($element, array(
        'id',
        'name',
        // 'size',
    ));
    _form_set_class($element, array(
        'form-file',
        'custom-file-input',
    ));
    $out = '<div class="custom-file">';
    $out .= '<input' . drupal_attributes($element['#attributes']) . ' />';
    $out .= '<label class="custom-file-label" for="' . $element['#attributes']['id'] . '">Выберите файл...</label>';
    $out .= '</div>';

    // $out .= '<pre>'.print_r($element['#attributes']['id'],true).'</pre>';
    // <div class="custom-file">
    // <input type="file" class="custom-file-input" id="validatedCustomFile" required="">
    // <label class="custom-file-label" for="validatedCustomFile">Choose file...</label>
    // <div class="invalid-feedback">Example invalid custom file feedback</div>
    // </div>

    return $out;
}

/**
 * Returns HTML for a textarea form element.
 */
function bs4theme_textarea($variables)
{
    $element = $variables['element'];
    element_set_attributes($element, array('id', 'name', 'cols', 'rows'));
    _form_set_class($element, array('form-textarea', 'form-control'));

    $wrapper_attributes = array(
        'class' => array('form-textarea-wrapper'),
    );
    $output = '<div' . drupal_attributes($wrapper_attributes) . '>';
    $output .= '<textarea' . drupal_attributes($element['#attributes']) . '>' . check_plain($element['#value']) . '</textarea>';
    $output .= '</div>';
    return $output;
}

/**
 * Returns HTML for status and/or error messages, grouped by type.
 */
function bs4theme_status_messages($variables)
{
    $display = $variables['display'];
    $output = '';

    $status_heading = array(
        'status' => t('Status message'),
        'error' => t('Error message'),
        'warning' => t('Warning message'),
    );
    $status_class = array(
        'status' => 'alert-success',
        'error' => 'alert-danger',
        'warning' => 'alert-warning',
    );
    foreach (drupal_get_messages($display) as $type => $messages) {
        $output = '';
        $output .= '<!-- Alert -->';
        if (!empty($status_heading[$type])) {
            $output .= '<div class="alert ' . $status_class[$type] . ' alert-dismissible fade show" role="alert">
      <h4 class="sr-only">' . $status_heading[$type] . '</h4>';
            if (count($messages) > 1) {
                $output .= " <ul>\n";
                foreach ($messages as $message) {
                    $output .= '  <li>' . $message . "</li>\n";
                }
                $output .= " </ul>\n";
            } else {
                $output .= reset($messages);
            }
            $output .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span></button>
  </div>';
        }
    }
    return $output;
}
