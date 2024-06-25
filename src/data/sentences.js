const sentences = [
    "The sun rose slowly over the horizon casting a warm golden light across the fields where farmers were already hard at work tending to their crops and animals preparing for another long day of labor under the clear blue sky",
    "In the middle of the bustling city a small park offered a peaceful sanctuary where people could sit on benches beneath the shade of ancient trees and listen to the gentle rustle of leaves in the breeze",
    "The children ran through the meadow chasing butterflies and laughing with pure joy as their parents watched from a distance smiling at the carefree innocence of youth and the simple pleasures of a sunny afternoon",
    "On the edge of the forest a cozy cottage stood surrounded by blooming flowers and the sounds of nature where an old woman tended to her garden humming a tune that echoed the tranquility of her surroundings",
    "As the evening approached the sky turned shades of pink and purple while the waves lapped gently against the shore where seagulls called out and the salty sea air filled the lungs of those walking along the beach"
]

export default function getText() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}