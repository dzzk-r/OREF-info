import json

languages = [
    "he", "en", "ru", "ar", "th", "tl", "am", "fr",
    "uk", "hi", "zh", "ne", "ti", "ro", "es"
]

slides = {}

for slide_num in range(1, 26):  # 1 to 25 inclusive
    slide_data = {}
    for lang in languages:
        slide_data[lang] = {
            "title": [],
            "subtitle": [],
            "description": []
        }
    slides[str(slide_num)] = slide_data

output = {
    "slides": slides
}

# Сохраняем в файл (опционально)
with open("lang_slides_template.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

# Также выводим в консоль
print(json.dumps(output, ensure_ascii=False, indent=2))
