from transformers import pipeline
import sys
import os
import re
import random

# Ensure this directory is in sys.path for import
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Use a better model for more coherent stories
try:
    generator = pipeline("text-generation", model="gpt2-medium")
except Exception:
    generator = pipeline("text-generation", model="gpt2")  # fallback

def get_dynamic_prompt(keywords):
    # Accept both string and list
    if isinstance(keywords, list):
        keywords_str = ", ".join(keywords)
    else:
        keywords_str = str(keywords)
    # Choose a dynamic starter based on keywords
    starters = [
        f"In a world of {keywords_str}, an adventure unfolds:",
        f"Long ago, when {keywords_str} ruled the land, a story began:",
        f"Amidst {keywords_str}, a hero rises:",
        f"The legend of {keywords_str} begins:",
        f"It was the age of {keywords_str}. What happened next was unexpected:",
        f"With {keywords_str} at stake, destiny called:",
        f"In the shadow of {keywords_str}, a journey starts:",
        f"When {keywords_str} appeared, everything changed:",
        f"This is the tale of {keywords_str}..."
    ]
    return random.choice(starters) + " "

def clean_story(text):
    # Remove bracketed/RAW Paste Data/strange sections
    text = re.sub(r"\[.*?\]", "", text)
    text = re.sub(r"RAW Paste Data", "", text, flags=re.IGNORECASE)
    # Remove lines with only underscores or pipes (ASCII art)
    text = re.sub(r"^[_|\s]+$", "", text, flags=re.MULTILINE)
    # Remove repeated sentences
    sentences = re.split(r'(?<=[.!?]) +', text)
    seen = set()
    unique_sentences = []
    for s in sentences:
        s_clean = s.strip().lower()
        if s_clean and s_clean not in seen:
            unique_sentences.append(s.strip())
            seen.add(s_clean)
    story = " ".join(unique_sentences)
    story = re.sub(r'\s+', ' ', story).strip()
    # Remove any remaining long runs of underscores or pipes
    story = re.sub(r'[_|]{5,}', '', story)
    # Capitalize first letter
    if story and not story[0].isupper():
        story = story[0].upper() + story[1:]
    # Ensure it ends with a period
    if story and story[-1] not in ".!?":
        story += "."
    return story

def generate_story(keywords):
    prompt = get_dynamic_prompt(keywords)
    result = generator(prompt, max_length=120, num_return_sequences=1, do_sample=True, temperature=0.85, top_p=0.92)
    story = result[0]["generated_text"]
    # Clean up the generated story
    story = clean_story(story)
    return story
