<?php
// Запрет атозаполнения формы
//   $form['#attributes']['autocomplete'] = 'off';

// Print out the progress bar at the top of the page.


print drupal_render($form['progressbar']);

// Print out the preview message if on the preview page.
if (isset($form['preview_message'])) {
    print '<div class="messages warning">';
    print drupal_render($form['preview_message']);
    print '</div>';
}

// Print out the main part of the form.
// Feel free to break this up and move the pieces within the array.
print drupal_render($form['submitted']);

// drupal_set_message('<pre>' . print_r($form['submitted'], TRUE) . '</pre>');

// Always print out the entire $form. This renders the remaining pieces of the
// form that haven't yet been rendered above (buttons, hidden elements, etc).
print drupal_render_children($form);
?>
