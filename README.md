## Welcome to GitHub Pages

You can use the [editor on GitHub](https://github.com/alex-kislyakov/alex-kislyakov.github.io/edit/main/README.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

### Markdown

Markdown is a lightweight and easy-to-use syntax for styling your writing. It includes conventions for

```markdown
Syntax highlighted code block

# Header 1
## Header 2
### Header 3

- Bulleted
- List

1. Numbered
2. List

**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```

For more details see [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).

### Jekyll Themes

Your Pages site will use the layout and styles from the Jekyll theme you have selected in your [repository settings](https://github.com/alex-kislyakov/alex-kislyakov.github.io/settings/pages). The name of this theme is saved in the Jekyll `_config.yml` configuration file.

### Support or Contact

Having trouble with Pages? Check out our [documentation](https://docs.github.com/categories/github-pages-basics/) or [contact support](https://support.github.com/contact) and we’ll help you sort it out.

## Как Добавлять Статьи
1. Нужно создать файл в папке `/blogs/_posts/` в 
   формате `year-month-day-name-of-article.markdown`,  
   где year - в формате XXXX, month - в формате XX, и day - в формате XX
   (X - это цифра).
2. Добавить в начало файла код:
    ```
    ---
    layout: mypost
    title:  "Эмоциональное выгорание"
    date:   year-month-day 00:00:00 +0200
    mytags:
      - психология
      - эмоциональное
      - выгорание
    uniqueID: 'PsicBurnout000'
    comments: true
    ---
    <link rel="stylesheet" href="/assets/css/navbar_bottom_space.css">
    ``` 
   **Важно!** Нужно изменить 
   - дату в строке
     ```
     date:   year-month-day 00:00:00 +0200
     ```
     на нужные значения, как в названии файла, 
   - и `uniqueID` в строке
     ```
     uniqueID: 'PsicBurnout000'
     ```
     на любую **уникальную** последовательность из английских букв и цифр. 
   Далее, если изменить `uniqueID`, то старые комментарии могут удалиться.  
   
   - Если изменить переменную comments на `comments: false`, то это сделает комменты невидимыми.

### Markdown
Чтобы добавить изображения - загрузи файл с картинкой в папку  `/img/blog/`. 
Название должно быть в только в латинице, без пробелов (цифры можно использовать).

**Важно!** При добовлении изображений не забудь сжать его в [squoosh.app](https://squoosh.app/) до 200-300 Mb максимум.

### Комментарии
Их можно модерировать в [disqus.com](https://disqus.com) .

