const express = require('express')
const app = express()
const http = require('http')
const socketIO = require('socket.io')
const server = http.createServer(app)
const io = socketIO(server)
const port = 6968
const {v4:uuidV4} = require('uuid')

const names = [
    "Grace", "Hope", "Joy", "Faith", "Amber", "Jade", "Ruby", "Ivy", "Rose", "Pearl",
    "Hunter", "Mason", "Parker", "Carter", "Sawyer", "Taylor", "Blake", "Reed", "Grant", "Chase",
    "Emma", "Olivia", "Ava", "Isabella", "Sophia", "Charlotte", "Mia", "Amelia", "Harper", "Evelyn",
    "Liam", "Noah", "William", "James", "Oliver", "Benjamin", "Elijah", "Lucas", "Mason", "Logan",
    "Ethan", "Alexander", "Henry", "Jackson", "Sebastian", "Aiden", "Matthew", "Samuel", "David", "Joseph",
    "Leo", "Julian", "Gabriel", "Anthony", "Isaac", "Lincoln", "Nathan", "Dylan", "Joshua", "Andrew",
    "Caleb", "Ryan", "Asher", "Christian", "Thomas", "Hunter", "Cameron", "Eli", "Ezra", "Aaron",
    "Landon", "Adrian", "Jonathan", "Nolan", "Jeremiah", "Easton", "Elias", "Colton", "Carter", "Robert",
    "Grace", "Lily", "Sienna", "Violet", "Aurora", "Hazel", "Brooklyn", "Penelope", "Scarlett", "Claire"
];
const words = [
    "apple", "banana", "grape", "orange", "pear", "peach", "plum", "mango", "kiwi", "lemon",
    "lime", "melon", "berry", "cherry", "fig", "date", "nut", "raisin", "avocado", "papaya",
    "carrot", "potato", "tomato", "onion", "pepper", "cucumber", "lettuce", "broccoli", "cabbage", "spinach",
    "zucchini", "pumpkin", "corn", "peas", "beans", "squash", "eggplant", "beet", "radish", "turnip",
    "bread", "butter", "cheese", "milk", "yogurt", "cream", "egg", "honey", "jam", "jelly",
    "cake", "cookie", "pie", "brownie", "donut", "muffin", "cupcake", "candy", "chocolate", "ice",
    "cream", "sorbet", "pudding", "custard", "gelato", "waffle", "pancake", "cereal", "toast", "bagel",
    "sandwich", "pizza", "pasta", "soup", "salad", "rice", "noodle", "bread", "butter", "cheese",
    "water", "juice", "soda", "tea", "coffee", "milk", "smoothie", "shake", "lemonade", "soup",
    "spoon", "fork", "knife", "plate", "bowl", "cup", "mug", "glass", "pot", "pan",
    "stove", "oven", "fridge", "freezer", "microwave", "toaster", "kettle", "blender", "grill", "whisk",
    "ladle", "tongs", "spatula", "peeler", "grater", "sieve", "colander", "rolling pin", "apron", "mitt",
    "table", "chair", "sofa", "bed", "desk", "dresser", "wardrobe", "lamp", "shelf", "drawer",
    "mirror", "rug", "carpet", "curtain", "blinds", "cushion", "pillow", "blanket", "quilt", "duvet",
    "fan", "heater", "air conditioner", "humidifier", "dehumidifier", "vacuum", "broom", "dustpan", "mop", "bucket",
    "bin", "bag", "basket", "box", "crate", "tray", "tub", "caddy", "pouch", "jar",
    "bottle", "can", "carton", "packet", "tube", "tube", "tube", "spray", "roll", "wrap",
    "string", "rope", "chain", "wire", "cable", "cord", "hose", "pipe", "tape", "glue",
    "stapler", "clip", "pin", "nail", "screw", "bolt", "nut", "washer", "peg", "hook",
    "button", "zipper", "velcro", "lace", "ribbon", "thread", "yarn", "needle", "scissors", "knife",
    "cutter", "blade", "saw", "axe", "hammer", "chisel", "file", "plane", "drill", "sander",
    "wrench", "spanner", "pliers", "tongs", "clamp", "vise", "anvil", "forge", "bellows", "tongs",
    "screwdriver", "socket", "ratchet", "extension", "adapter", "bit", "chuck", "key", "wrench", "spanner",
    "brush", "roller", "sprayer", "scraper", "sander", "grinder", "buffer", "polisher", "vacuum", "washer",
    "dryer", "iron", "steamer", "press", "sewing", "machine", "knitting", "loom", "wheel", "kiln",
    "camera", "lens", "flash", "tripod", "stand", "light", "bulb", "shade", "fixture", "cord",
    "plug", "socket", "switch", "dimmer", "fuse", "breaker", "panel", "meter", "generator", "motor",
    "pump", "compressor", "tank", "valve", "filter", "heater", "cooler", "fan", "vent", "duct",
    "pipe", "hose", "nozzle", "sprinkler", "faucet", "tap", "sink", "basin", "tub", "shower",
    "bath", "toilet", "bidet", "urinal", "flush", "tank", "valve", "pipe", "trap", "vent",
    "drain", "sewer", "line", "main", "manhole", "cover", "grate", "screen", "filter", "trap",
    "tap", "faucet", "valve", "nozzle", "spray", "jet", "hose", "pipe", "tube", "line",
    "conduit", "cable", "wire", "cord", "plug", "socket", "switch", "dimmer", "fuse", "breaker",
    "panel", "box", "cover", "plate", "frame", "trim", "molding", "casing", "sill", "jamb",
    "lintel", "beam", "column", "post", "rafter", "joist", "stud", "plate", "brace", "anchor",
    "tie", "bolt", "screw", "nail", "pin", "peg", "dowel", "rod", "bar", "tube",
    "pipe", "hose", "fitting", "connector", "coupling", "union", "adapter", "elbow", "tee", "cross",
    "cap", "plug", "valve", "spigot", "tap", "cock", "bibb", "nozzle", "spray", "jet"
];
const wordss = ['bear', 'archaeologist', 'sunflower', 'hair', 'Vin Diesel', 'Daffy Duck', 'broomstick', 'unibrow', 'accident', 'saliva', 'Batman', 'radiation', 'boots', 'tornado', 'skyscraper', 'knife', 'witch', 'glass', 'Patrick', 'tank', 'type', 'shampoo', 'emerald', 'factory', 'apartment', 'Darwin', 'pig', 'underweight', 'grandmother', 'bar', 'short', 'iron', 'cloth', 'William Wallace', 'skydiving', 'chopsticks', 'cord', 'rug', 'spaceship', 'moss', 'ponytail', 'elbow', 'path', 'Barack Obama', 'centaur', 'wave', 'cello', 'Mark Zuckerberg', 'sailboat', 'JayZ', 'cheeks', 'Dora', 'Ferrari', 'meatloaf', 'burglar', 'dog', 'double', 'sneeze', 'Tweety', 'Donald Duck', 'Pumba', 'messy', 'melt', 'graduation', 'wart', 'moose', 'Zeus', 'school', 'kiss', 'dream', 'Shrek', 'snow', 'Steve Jobs', 'Hollywood', 'eclipse', 'record', 'sale', 'lottery', 'field', 'ring', 'pet shop', 'symphony', 'portal', 'ear', 'Elsa', 'basement', 'emoji', 'Elon Musk', 'Robbie Rotten', 'security', 'Flash', 'Grinch', 'spy', 'finger', 'Ikea', 'loot', 'seahorse', 'bird bath', 'fabulous', 'Donald Trump', 'library', 'panther', 'birthday', 'nachos', 'dough', 'Terminator', 'Sydney Opera House', 'anthill', 'scar', 'quokka', 'Angry Birds', 'happy', 'BMW', 'luggage', 'bacon', 'maze', 'brush', 'sand castle', 'tiny', 'Minion', 'James Bond', 'beach', 'fork', 'sandwich', 'Australia', 'casino', 'stoned', 'Antarctica', 'AC/DC', 'Jackie Chan', 'reeds', 'oval', 'scoop', 'gnome', 'taser', 'bingo', 'arrow', 'blender', 'America', 'bakery', 'point', 'fly swatter', 'ski', 'condiment', 'knee', 'dandruff', 'yearbook', 'mouth', 'cabinet', 'cold', 'Mercury', 'ice', 'skull', 'tire', 'barbecue', 'Mercedes', 'icicle', 'muscle', 'wedding', 'librarian', 'Amsterdam', 'hotel', 'plow', 'weak', 'nail', 'Peppa Pig', 'target', 'bagpipes', 'carnival', 'storm', 'cookie jar', 'florist', 'hop', 'keg', 'spaghetti', 'hive', 'compass', 'air conditioner', 'golf cart', 'bus stop', 'pants', 'forehead', 'basket', 'mechanic', 'zoo', 'ladybug', 'mothball', 'Nemo', 'cute', 'printer', 'palette', 'royal', 'border', 'London Eye', 'picnic', 'Christmas', 'nurse', 'dwarf', 'alpaca', 'hopscotch', 'garage', 'eggplant', 'strong', 'rocket', 'scientist', 'bow', 'landscape', 'fingernail', 'pound', 'pumpkin', 'bait', 'lyrics', 'wrinkle', 'palm tree', 'Ireland', 'sombrero', 'stapler', 'Apple', 'Israel', 'birch', 'western', 'Hulk', 'helmet', 'Africa', 'vlogger', 'Kermit', 'clean', 'patio', 'windmill', 'skeleton', 'backbone', 'feather', 'submarine', 'beef', 'rib', 'day', 'quill', 'spore', 'skribbl.io', 'yellow', 'legs', 'black', 'nightclub', 'Italy', 'anchor', 'mask', 'fabric', 'kindergarten', 'diss track', 'pencil', 'spit', 'Medusa', 'glue stick', 'Suez Canal', 'tooth', 'stop sign', 'prawn', 'peas', 'clownfish', 'Frankenstein', 'viola', 'Fanta', 'jungle', 'pistol', 'claw', 'priest', 'vuvuzela', 'alley', 'lighthouse', 'diva', 'meal', 'Tails', 'cola', 'catapult', 'tourist', 'intersection', 'stingray', 'base', 'copy', 'groom', 'orbit', 'Morgan Freeman', 'spoiler', 'juggle', 'Iron Man', 'Discord', 'patriot', 'harmonica', 'Cookie Monster', 'popcorn', 'hunger', 'invasion', 'salt', 'snake', 'avocado', 'opera', 'pimple', 'socks', 'spray paint', 'Happy Meal', 'Rick', 'seasick', 'curry', 'uniform', 'deer', 'tuna', 'soap', 'thin', 'Tooth Fairy', 'Popsicle', 'rain', 'mayonnaise', 'hobbit', 'laser', 'Bill Gates', 'swing', 'pepperoni', 'Scooby Doo', 'elder', 'socket', 'lips', 'jeans', 'Aladdin', 'love', 'disaster', 'sushi', 'table', 'toothpick', 'good', 'dots', 'gentle', 'Facebook', 'flamingo', 'mud', 'cell phone', 'nut', 'wingnut', 'Dexter', 'dalmatian', 'poke', 'Bambi', 'plate', 'shovel', 'roll', 'ambulance', 'voodoo', 'wax', 'sit', 'navy', 'Xbox', 'observatory', 'Pokemon', 'white', 'manatee', 'Skype', 'Google', 'filter', 'bark', 'bathroom', 'blood', 'fortress', 'twig', 'head', 'fisherman', 'notification', 'wake up', 'Germany', 'island', 'drum', 'lamp', 'apricot', 'penguin', 'face', 'Garfield', 'alcohol', 'lilypad', 'New Zealand', 'Twitter', 'speaker', 'orca', 'tablecloth', 'Great Wall', 'restaurant', 'bleach', 'lion', 'price tag', 'pike', 'eyelash', 'battery', 'forest fire', 'hedgehog', 'Kirby', 'drum kit', 'earthquake', 'hexagon', 'Easter Bunny', 'abstract', 'oxygen', 'tropical', 'skinny', 'accordion', 'cookie', 'Nutella', 'seagull', 'revolver', 'vision', 'knuckle', 'Superman', 'fencing', 'coral reef', 'stamp', 'leader', 'cone', 'palace', 'dead', 'Yoda', 'infinite', 'bill', 'receptionist', 'guinea pig', 'potato', 'fluid', 'cheeseburger', 'punk', 'prune', 'crate', 'west', 'Zelda', 'India', 'Scotland', 'Zuma', 'forest', 'defense', 'iPad', 'cave', 'thermometer', 'Popeye', 'pensioner', 'postcard', 'desert', 'remote', 'sculpture', 'cream', 'Xerox', 'cardboard', 'flashlight', 'butcher', 'McDonalds', 'rest', 'Eminem', 'bathtub', 'beatbox', 'hot', 'clown', 'apocalypse', 'antivirus', 'unicycle', 'frame', 'taxi', 'tip', 'chinchilla', 'hard', 'saltwater', 'detective', 'open', 'armpit', 'darts', 'thumb', 'canary', 'action', 'plug', 'purity', 'switch', 'globe', 'Wonder Woman', 'pajamas', 'tea', 'mouse', 'butter', 'turkey', 'The Beatles', 'armor', 'chimney', 'fish', 'William Shakespeare', 'Dumbo', 'king', 'radio', 'volcano', 'fairy', 'ruler', 'towel', 'ticket', 'pan', 'snail', 'tortoise', 'panda', 'sphinx', 'festival', 'injection', 'airbag', 'jazz', 'Playstation', 'Photoshop', 'shy', 'pavement', 'Bitcoin', 'Star Wars', 'punishment', 'flute', 'ringtone', 'thunder', 'vitamin', 'cocktail', 'levitate', 'lightning', 'homeless', 'dishrag', 'glitter', 'Rome', 'failure', 'Morse code', 'lap', 'wiggle', 'shaving cream', 'keyboard', 'Nike', 'eskimo', 'newspaper', 'barbarian', 'vault', 'wall', 'virus', 'lobster', 'fire hydrant', 'circus', 'Sherlock Holmes', 'Egypt', 'can', 'Singapore', 'ramp', 'thug', 'ice cream', 'bottle flip', 'cash', 'raccoon', 'Gru', 'Bart Simpson', 'pharmacist', 'thunderstorm', 'cork', 'rock', 'Gumball', 'lasso', 'son', 'acorn', 'Pinocchio', 'airport', 'caterpillar', 'diagram', 'biology', 'slam', 'iceberg', 'Netherlands', 'vacuum', 'bandana', 'Picasso', 'pause', 'grasshopper', 'pickaxe', 'cup', 'litter box', 'Microsoft', 'burp', 'loaf', 'poor', 'smell', 'science', 'meteorite', 'pastry', 'bear trap', 'fast food', 'octopus', 'butterfly', 'geyser', 'spring', 'yardstick', 'sniper', 'tissue box', 'calendar', 'scissors', 'Creeper', 'sledgehammer', 'cheerleader', 'red', 'Samsung', 'graveyard', 'bell pepper', 'interview', 'Las Vegas', 'wife', 'clay', 'score', 'mermaid', 'full moon', 'charger', 'provoke', 'link', 'snowball', 'surface', 'rainforest', 'incognito', 'read', 'Leonardo DiCaprio', 'heat', 'puppet', 'torpedo', 'chameleon', 'chime', 'electricity', 'prism', 'Mount Rushmore', 'insomnia', 'Mickey Mouse', 'Homer Simpson', 'anteater', 'warm', 'tiramisu', 'orchestra', 'die', 'silo', 'shape', 'baboon', 'Abraham Lincoln', 'palm', 'invisible', 'gentleman', 'museum', 'spine', 'stage', 'emu', 'bullet', 'toothbrush', 'sand', 'mafia', 'starfruit', 'honeycomb', 'warehouse', 'oar', 'zipline', 'apple pie', 'barbed wire', 'ace', 'coaster', 'adorable', 'gasoline', 'lock', 'car wash', 'tailor', 'traffic light', 'village', 'pelican', 'tape', 'lightsaber', 'fox', 'laptop', 'organ', 'Hello Kitty', 'community', 'insect', 'belly', 'ant', 'massage', 'Wolverine', 'Minecraft', 'dent', 'Romania', 'goblin', 'pink', 'broom', 'cowbell', 'brick', 'Gandhi', 'barrel', 'Cerberus', 'drain', 'hat', 'fence', 'display', 'carnivore', 'electrician', 'excavator', 'lightbulb', 'wasp', 'pineapple', 'razor', 'Angelina Jolie', 'orchid', 'shirt', 'werewolf', 'taco', 'dentist', 'talent show', 'panpipes', 'sunglasses', 'shoelace', 'Hawaii', 'noodle', 'horn', 'boar', 'addiction', 'addition', 'afro', 'airplane', 'alarm', 'alien', 'almond', 'anaconda', 'angel', 'anglerfish', 'angry', 'animation', 'anime', 'apple', 'apple seed', 'aquarium', 'architect', 'ash', 'assassin', 'assault', 'asteroid', 'astronaut', 'athlete', 'atom', 'audience', 'axe', 'baby', 'bad', 'bag', 'bagel', 'baguette', 'balance', 'balcony', 'bald', 'ball', 'ballerina', 'balloon', 'banana', 'bandage', 'banjo', 'bank', 'barber', 'barn', 'basketball', 'bat', 'battle', 'battleship', 'bayonet', 'bazooka', 'beak', 'bean', 'beanie', 'beanstalk', 'beaver', 'bed', 'bedtime', 'bee', 'beer', 'bell', 'belly button', 'below', 'belt', 'bench', 'bicycle', 'billiards', 'bird', 'biscuit', 'bite', 'black hole', 'blackberry', 'blacksmith', 'blimp', 'blind', 'blindfold', 'blizzard', 'blowfish', 'blue', 'blueberry', 'board', 'bodyguard', 'bomb', 'booger', 'book', 'boomerang', 'bottle', 'bounce', 'bowl', 'bowling', 'box', 'boy', 'bracelet', 'brain', 'branch', 'brand', 'bread', 'breakfast', 'breath', 'bride', 'bridge', 'broadcast', 'broccoli', 'broken heart', 'bronze', 'brownie', 'bruise', 'bubble', 'bubble gum', 'bucket', 'bulge', 'bull', 'bulldozer', 'bungee jumping', 'bunny', 'bus driver', 'butler', 'button', 'cab driver', 'cabin', 'cactus', 'cage', 'cake', 'camel', 'campfire', 'can opener', 'cannon', 'canyon', 'cape', 'cappuccino', 'captain', 'carpenter', 'carpet', 'carrot', 'cast', 'cathedral', 'cauldron', 'cauliflower', 'caveman', 'ceiling fan', 'celebrate', 'cell', 'centipede', 'chain', 'chair', 'chalk', 'champagne', 'champion', 'chandelier', 'cheek', 'cheese', 'cheesecake', 'cheetah', 'chef', 'cherry', 'chess', 'chest', 'chest hair', 'chestplate', 'chicken', 'chihuahua', 'child', 'chin', 'chocolate', 'church', 'cigarette', 'cinema', 'circle', 'clap', 'clickbait', 'cliff', 'climb', 'cloak', 'clock', 'clothes hanger', 'cloud', 'clover', 'coach', 'coal', 'coast guard', 'coat', 'cockroach', 'coconut', 'cocoon', 'coffee', 'coffee shop', 'coffin', 'coin', 'collar', 'color-blind', 'comb', 'comedian', 'comic book', 'commercial', 'communism', 'complete', 'computer', 'concert', 'confused', 'console', 'corkscrew', 'corn', 'corn dog', 'corpse', 'cotton', 'cotton candy', 'crab', 'crack', 'crayon', 'credit', 'credit card', 'cricket', 'crocodile', 'crossbow', 'crow', 'cruise', 'crust', 'crystal', 'cube', 'cuckoo', 'cucumber', 'cupboard', 'cupcake', 'curtain', 'cut', 'cyborg', 'cylinder', 'dagger', 'daisy', 'dance', 'dandelion', 'deaf', 'demon', 'demonstration', 'deodorant', 'depressed', 'derp', 'desk', 'dessert', 'detonate', 'diagonal', 'diamond', 'diaper', 'dictionary', 'diet', 'dinosaur', 'dirty', 'dispenser', 'distance', 'divorce', 'dizzy', 'doghouse', 'dollar', 'dollhouse', 'dolphin', 'dominoes', 'door', 'doorknob', 'download', 'dragon', 'dragonfly', 'drawer', 'drink', 'drive', 'driver', 'drool', 'droplet', 'duct tape', 'dynamite', 'eagle', 'earbuds', 'earwax', 'eat', 'egg', 'electric car', 'electric guitar', 'elephant', 'elevator', 'end', 'engine', 'equator', 'error', 'evaporate', 'evening', 'evolution', 'exam', 'explosion', 'eye', 'eyebrow', 'eyeshadow', 'face paint', 'fall', 'family', 'farm', 'farmer', 'fashion designer', 'fast', 'fast forward', 'father', 'faucet', 'fidget spinner', 'filmmaker', 'fingertip', 'fire truck', 'fireball', 'firehouse', 'fireman', 'fireplace', 'fireside', 'firework', 'fish bowl', 'fist fight', 'fitness trainer', 'flag', 'flagpole', 'flamethrower', 'flea', 'flock', 'flower', 'flu', 'fly', 'fog', 'fortune', 'fossil', 'fountain', 'freezer', 'fridge', 'fries', 'frog', 'frown', 'fruit', 'full', 'funeral', 'funny', 'gang', 'garbage', 'gardener', 'garlic', 'gas mask', 'gate', 'gem', 'genie', 'germ', 'ghost', 'giant', 'gift', 'giraffe', 'gladiator', 'glasses', 'gloss', 'glove', 'glow', 'glowstick', 'goal', 'godfather', 'gold', 'gold chain', 'golden apple', 'golden egg', 'goldfish', 'golf', 'goose', 'gorilla', 'graffiti', 'grapefruit', 'grapes', 'graph', 'grass', 'grave', 'gravedigger', 'grenade', 'grid', 'grill', 'grin', 'guillotine', 'gumball', 'gummy', 'gummy worm', 'hacker', 'hairbrush', 'haircut', 'hairspray', 'hairy', 'half', 'hamburger', 'hammer', 'hamster', 'hand', 'handicap', 'handshake', 'hanger', 'harbor', 'hard hat', 'harp', 'harpoon', 'hashtag', 'hazard', 'hazelnut', 'headboard', 'heading', 'heart', 'heel', 'heist', 'helicopter', 'hell', 'hen', 'hero', 'hibernate', 'hieroglyph', 'high five', 'high heels', 'highway', 'hippie', 'hippo', 'hitchhiker', 'hockey', 'holiday', 'honey', 'hoof', 'hook', 'horizon', 'horse', 'horsewhip', 'hose', 'hospital', 'hot chocolate', 'hot dog', 'hot sauce', 'hourglass', 'hug', 'hummingbird', 'hurdle', 'hurt', 'husband', 'hut', 'hypnotize', 'ice cream truck', 'idea', 'imagination', 'industry', 'inside', 'ivy', 'jacket', 'jackhammer', 'jaguar', 'jalapeno', 'janitor', 'jaw', 'jeep', 'jello', 'jelly', 'jellyfish', 'jet ski', 'joker', 'journalist', 'judge', 'juice', 'jump rope', 'junk food', 'kangaroo', 'karaoke', 'karate', 'katana', 'kebab', 'ketchup', 'key', 'kidney', 'kite', 'kitten', 'kiwi', 'kneel', 'knight', 'kraken', 'ladder', 'lady', 'lamb', 'language', 'lantern', 'lava lamp', 'lawn mower', 'lawyer', 'leaf', 'leak', 'leash', 'lemon', 'lemonade', 'lettuce', 'lid', 'lighter', 'limbo', 'lime', 'limousine', 'line', 'lizard', 'llama', 'loading', 'log', 'lollipop', 'loser', 'low', 'luck', 'lumberjack', 'lung', 'machine', 'magazine', 'magic', 'magic wand', 'magician', 'magma', 'magnet', 'mailbox', 'mailman', 'makeup', 'manicure', 'mansion', 'maracas', 'marathon', 'marmot', 'marshmallow', 'mascot', 'matchbox', 'mattress', 'meat', 'meatball', 'megaphone', 'melon', 'meme', 'message', 'metal', 'microphone', 'microwave', 'midnight', 'military', 'milk', 'milkman', 'milkshake', 'mime', 'minigolf', 'mint', 'minute', 'mirror', 'missile', 'mohawk', 'money', 'monk', 'monkey', 'monster', 'moon', 'mop', 'morning', 'mosquito', 'moth', 'mother', 'motorbike', 'mountain', 'mousetrap', 'movie', 'muffin', 'mug', 'murderer', 'musket', 'mustache', 'mustard', 'nail file', 'napkin', 'narwhal', 'nerd', 'network', 'nickel', 'night', 'nightmare', 'ninja', 'noob', 'north', 'nose', 'nose hair', 'nosebleed', 'nostrils', 'notepad', 'nothing', 'novel', 'nugget', 'nuke', 'nutcracker', 'nutshell', 'ocean', 'office', 'old', 'omelet', 'onion', 'orange', 'orangutan', 'ostrich', 'outside', 'overweight', 'owl', 'oyster', 'paddle', 'page', 'pain', 'paint', 'pancake', 'paper', 'paper bag', 'parachute', 'parakeet', 'parents', 'park', 'parking', 'parrot', 'party', 'password', 'pasta', 'paw', 'peace', 'peach', 'peacock', 'pedal', 'pencil case', 'pencil sharpener', 'pendulum', 'penny', 'pepper', 'perfume', 'person', 'pet food', 'petal', 'photo frame', 'photograph', 'photographer', 'pickle', 'pie', 'pill', 'pillow', 'pillow fight', 'pilot', 'pinball', 'pine', 'pine cone', 'pinky', 'pinwheel', 'pirate', 'pirate ship', 'pitchfork', 'pizza', 'plague', 'planet', 'plank', 'platypus', 'playground', 'pocket', 'poisonous', 'pollution', 'polo', 'pond', 'pony', 'poodle', 'poop', 'porch', 'porcupine', 'portrait', 'positive', 'poster', 'pot', 'pot of gold', 'potion', 'powder', 'pray', 'preach', 'pregnant', 'present', 'president', 'pretzel', 'prince', 'princess', 'prison', 'professor', 'programmer', 'protest', 'pudding', 'puddle', 'puffin', 'puma', 'purse', 'puzzle', 'pyramid', 'quarter', 'queen', 'queue', 'race', 'racecar', 'radish', 'raft', 'rail', 'rainbow', 'raindrop', 'raisin', 'rake', 'ram', 'rapper', 'raspberry', 'razorblade', 'reality', 'rectangle', 'recycling', 'red carpet', 'reflection', 'relationship', 'rewind', 'rhinoceros', 'ribbon', 'rice', 'river', 'robin', 'robot', 'rockstar', 'room', 'rooster', 'root', 'rose', 'rubber', 'ruby', 'run', 'rune', 'sad', 'salad', 'salmon', 'sandbox', 'sandstorm', 'satellite', 'sauce', 'scarf', 'scent', 'scream', 'screen', 'screw', 'scribble', 'scythe', 'sea', 'sea lion', 'seafood', 'seal', 'seashell', 'season', 'seat belt', 'seaweed', 'second', 'seed', 'seesaw', 'semicircle', 'sewing machine', 'shadow', 'sheep', 'shelf', 'shell', 'shipwreck', 'shock', 'shoe', 'shoebox', 'shop', 'shopping cart', 'shoulder', 'shout', 'shower', 'shrub', 'sick', 'signature', 'silence', 'silver', 'silverware', 'sing', 'sink', 'six pack', 'skateboard', 'skateboarder', 'ski jump', 'sky', 'sledge', 'sleeve', 'slide', 'slime', 'slippery', 'sloth', 'slow', 'smile', 'smoke', 'snowball fight', 'snowboard', 'snowman', 'soccer', 'soda', 'sound', 'soup', 'south', 'space', 'spade', 'spark', 'sparkles', 'spear', 'spelunker', 'spider', 'spin', 'spinach', 'spiral', 'sponge', 'spool', 'spoon', 'sports', 'sprinkler', 'square', 'squid', 'squirrel', 'stab', 'stadium', 'stand', 'star', 'starfish', 'statue', 'steam', 'step', 'stomach', 'stone', 'stove', 'straw', 'strawberry', 'street', 'stress', 'student', 'studio', 'study', 'subway', 'suitcase', 'summer', 'sun', 'sunshade', 'supermarket', 'surfboard', 'surgeon', 'survivor', 'swamp', 'swan', 'swarm', 'sweat', 'sweater', 'swimming pool', 'swimsuit', 'swordfish', 'table tennis', 'tablet', 'tadpole', 'tail', 'take off', 'tangerine', 'tarantula', 'taxi driver', 'teapot', 'tear', 'teaspoon', 'teddy bear', 'telephone', 'telescope', 'television', 'temperature', 'tennis', 'tennis racket', 'tent', 'tentacle', 'thief', 'thirst', 'throat', 'tickle', 'tie', 'tiger', 'time machine', 'timpani', 'tired', 'toad', 'toast', 'toaster', 'toenail', 'toilet', 'tomato', 'tomb', 'tombstone', 'tongue', 'toothpaste', 'top hat', 'torch', 'totem', 'toucan', 'tow truck', 'tower', 'toy', 'tractor', 'traffic', 'trailer', 'train', 'trap', 'trash can', 'traveler', 'treasure', 'tree', 'treehouse', 'trend', 'triangle', 'tricycle', 'trigger', 'triplets', 'tripod', 'trombone', 'trophy', 'truck', 'truck driver', 'trumpet', 'tug', 'turd', 'turnip', 'turtle', 'tuxedo', 'udder', 'ukulele', 'umbrella', 'uncle', 'unicorn', 'universe', 'valley', 'vampire', 'vanilla', 'vegetable', 'vein', 'vent', 'victim', 'victory', 'video', 'video game', 'vine', 'vise', 'vodka', 'volleyball', 'volume', 'vomit', 'vortex', 'waist', 'wallpaper', 'walrus', 'watch', 'water', 'water cycle', 'water gun', 'wealth', 'weapon', 'weasel', 'weather', 'web', 'website', 'well', 'whale', 'whistle', 'wind', 'window', 'wine', 'wine glass', 'wing', 'winner', 'winter', 'wire', 'wireless', 'wizard', 'wolf', 'wonderland', 'woodpecker', 'wool', 'work', 'worm', 'wound', 'wrapping', 'wreath', 'wrench', 'wrestling', 'wrist', 'x-ray', 'xylophone', 'yacht', 'yeti', 'yo-yo', 'yogurt', 'yolk', 'young', 'zebra', 'zigzag', 'zipper', 'zombie', 'zoom', 'W-LAN', 'cherry blossom', 'Adidas', 'galaxy', 'procrastination', 'vote', 'burrito', 'snowflake', 'wheelbarrow', 'Jesus Christ', 'Einstein', 'Porky Pig', 'chew', 'underground', 'China', 'Skrillex', 'dock', 'streamer', 'gender', 'echo', 'MTV', 'Canada', 'magic trick', 'SpongeBob', 'Spiderman', 'asymmetry', 'Monday', 'Bomberman', 'Crash Bandicoot', 'firecracker', 'Usain Bolt', 'disease', 'adult', 'slump', 'Pink Panther', 'jester', 'Wall-e', 'rat', 'ballet', 'writer', 'Android', 'Cupid', 'headband', 'alligator', 'foil', 'Lego', 'text', 'Mona Lisa', 'Zorro', 'Teletubby', 'social media', 'skin', 'WhatsApp', 'Easter', 'gasp', 'east', 'Finn and Jake', 'Robin Hood', 'mammoth', 'kitchen', 'armadillo', 'Mexico', 'deep', 'leprechaun', 'Lasagna', 'fire alarm', 'Kim Jong-un', 'Uranus', 'internet', 'chimpanzee', 'Chuck Norris', 'Tower Bridge', 'controller', 'neck', 'donkey', 'superpower', 'Mr Bean', 'trick shot', 'John Cena', 'catfish', 'bobsled', 'bamboo', 'Lion King', 'periscope', 'generator', 'roadblock', 'licorice', 'Phineas and Ferb', 'binoculars', 'Finn', 'workplace', 'bartender', 'Norway', 'collapse', 'waffle', 'Asia', 'whisk', 'gangster', 'Monster', 'employer', 'Obelix', 'Jimmy Neutron', 'mold', 'motorcycle', 'Spartacus', 'Portugal', 'laboratory', 'Paypal', 'fireproof', 'toe', 'Thor', 'Chewbacca', 'referee', 'dress', 'guitar', 'allergy', 'Olaf', 'Mount Everest', 'vertical', 'aircraft', 'Atlantis', 'archer', 'toolbox', 'hyena', 'pipe', 'undo', 'reindeer', 'NASCAR', 'cousin', 'Big Ben', 'dome', 'coast', 'whisper', 'coyote', 'sting', 'dig', 'cowboy', 'vaccine', 'piano', 'ceiling', 'marigold', 'map', 'Squidward', 'Beethoven', 'Colosseum', 'touch', 'Kung Fu', 'canister', 'Youtube', 'goat', 'customer', 'France', 'country', 'mannequin', 'Harry Potter', 'risk', 'walk', 'delivery', 'roof', 'Steam', 'Argentina', 'Iron Giant', 'bookshelf', 'Pepsi', 'cringe', 'Greece', 'Mozart', 'popular', 'repeat', 'pub', 'spatula', 'skyline', 'frosting', 'Saturn', 'dew', 'lane', 'garden', 'boil', 'Katy Perry', 'blush', 'London', 'religion', 'waiter', 'brainwash', 'Cuba', 'Earth', 'antenna', 'goatee', 'grumpy', 'gravel', 'kendama', 'peninsula', 'windshield', 'Vault boy', 'stork', 'fake teeth', 'croissant', 'Deadpool', 'Santa', 'cornfield', 'engineer', 'Vatican', 'reptile', 'camping', 'slope', 'Japan', 'sausage', 'fort', 'sunrise', 'nature', 'shotgun', 'poison', 'Stone Age', 'sleep', 'headphones', 'jail', 'welder', 'Dracula', 'scuba', 'Lady Gaga', 'firefly', 'Audi', 'espresso', 'Neptune', 'leather', 'zeppelin', 'slingshot', 'lily', 'Russia', 'pro', 'cicada', 'Statue of Liberty', 'kettle', 'Europe', 'flight attendant', 'election', 'origami', 'hill', 'continent', 'soldier', 'Home Alone', 'antelope', 'Cat Woman', 'Captain America', 'Intel', 'Eiffel tower', 'betray', 'duck', 'piggy bank', 'skunk', 'Pluto', 'Tarzan', 'God', 'acid', 'bed bug', 'Oreo', 'freckles', 'chemical', 'tissue', 'mantis', 'clarinet', 'tunnel', 'knot', 'Nintendo Switch', 'shallow', 'cobra', 'Yoshi', 'drip', 'BMX', 'North Korea', 'crowbar', 'Mummy', 'space suit', 'Jack-o-lantern', 'meerkat', 'Sonic', 'Fred Flintstone', 'embers', 'coral', 'radar', 'DNA', 'violence', 'ham', 'pistachio', 'comfortable', 'Croatia', 'Hula Hoop', 'translate', 'cymbal', 'neighbor', 'beet', 'margarine', 'Michael Jackson', 'bricklayer', 'Black Friday', 'sugar', 'witness', 'greed', 'shake', 'neighborhood', 'Doritos', 'doctor', 'Minotaur', 'Reddit', 'poppy', 'nail polish', 'Pikachu', 'Excalibur', 'cow', 'throne', 'braces', 'retail', 'badger', 'fizz', 'Elmo', 'yawn', 'Mars', 'quilt', 'firefighter', 'oil', 'bus', 'Anubis', 'floodlight', 'mayor', 'ravioli', 'cap', 'match', 'Asterix', 'arch', 'Goofy', 'tampon', 'building', 'pin', 'Tower of Pisa', 'Jenga', 'vacation', 'sauna', 'Tetris', 'nest', 'bunk bed', 'ABBA', 'scary', 'arm', 'iPhone', 'Susan Wojcicki', 'nun', 'parade', 'crawl space', 'Pac-Man', 'soil', 'lens', 'gas', 'mall', 'Green Lantern', 'celebrity', 'promotion', 'hammock', 'stereo', 'pillar', 'Capricorn', 'facade', 'Titanic', 'dinner', 'Luigi', 'Winnie the Pooh', 'Gandalf', 'Charlie Chaplin', 'villain', 'Johnny Bravo', 'halo', 'pigeon', 'butt cheeks', 'hip hop', 'macho', 'hovercraft', 'needle', 'hair roller', 'Notch', 'upgrade', 'bean bag', 'bellow', 'plunger', 'Mario', 'pigsty', 'KFC', 'wheel', 'Brazil', 'swag', 'Nasa', 'autograph', 'hilarious', 'acne', 'backpack', 'manhole', 'applause', 'Bruce Lee', 'Segway', 'advertisement', 'Poseidon', 'reception', 'vinegar', 'geography', 'peasant', 'Skittles', 'teacher', 'bed sheet', 'abyss', 'corner', 'cat', 'Miniclip', 'saxophone', 'safe', 'model', 'trapdoor', 'copper', 'anvil', 'Leonardo da Vinci', 'lounge', 'plumber', 'eel', 'blanket', 'house', 'otter', 'Mr. Meeseeks', 'kazoo', 'think', 'youtuber', 'frostbite', 'octagon', 'Bible', 'figurine', 'pear', 'world', 'peanut', 'daughter', 'Pringles', 'gravity', 'willow', 'sew', 'Northern Lights', 'health', 'backflip', 'Mont Blanc', 'crucible', 'Bugs Bunny', 'cement', 'actor', 'comedy', 'chainsaw', 'virtual reality', 'England', 'polar bear', 'fern', 'folder', 'microscope', 'tattoo', 'lynx', 'shopping', 'violin', 'Mr. Bean', 'Velociraptor', 'macaroni', 'quicksand', 'UFO', 'patient', 'glue', 'wrestler', 'duel', 'Sudoku', 'cushion', 'walnut', 'drama', 'caviar', 'King Kong', 'USB', 'Darwin Watterson', 'saddle', 'paintball', 'baklava', 'hermit', 'diploma', 'candle', 'Madagascar', 'beetle', 'Morty', 'dashboard', 'nutmeg', 'Hercules', 'Solar System', 'camera', 'tuba', 'leech', 'search', 'Slinky', 'lipstick', 'headache', 'Paris', 'pogo stick', 'lemur', 'Mr Meeseeks', 'player', 'invention', 'bumper', 'handle', 'sword', 'tabletop', 'shark', 'laundry', 'Chinatown', 'Spain', 'label', 'vanish', 'nose ring', 'drought', 'policeman', 'Stegosaurus', 'dice', 'pope', 'attic', 'Family Guy', 'server', 'vulture', 'banker', 'treadmill', 'chestnut', 'scarecrow', 'lake', 'doll', 'impact', 'papaya', 'landlord', 'flying pig', 'brunette', 'flask', 'notebook', 'boat', 'bookmark', 'floppy disk', 'back pain', 'shrew', 'T-rex', 'motherboard', 'stylus', 'magnifier', 'Band-Aid', 'journey', 'minivan', 'lotion', 'cartoon', 'skates', 'barcode', 'conversation', 'maid', 'desperate', 'Chrome', 'waterfall', 'furniture', 'Yin and Yang', 'wig', 'food', 'sensei', 'Venus', 'albatross', 'vegetarian', 'Florida', 'Milky Way', 'aristocrat', 'flush', 'tumor', 'safari', 'catalog', 'veterinarian', 'high score', 'afterlife', 'logo', 'mushroom', 'mole', 'marmalade', 'eraser', 'gummy bear', 'comet', 'hunter', 'bouncer', 'exercise', 'commander', 'classroom', 'lava', 'koala', 'market', 'miner', 'marble', 'fur', 'raincoat', 'sunburn', 'robber', 'leave', 'girl']


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getWords() {
    var choice1 = getRandomNumber(0, words.length-1);
    var choice2 = getRandomNumber(0, words.length-1);
    var choice3 = getRandomNumber(0, words.length-1);

    // Create and return the object with the selected words
    return {
        // choice1: words[choice1],
        // choice2: words[choice2],
        // choice3: words[choice3]
        options: [words[choice1],words[choice2],words[choice3]]
    };
}


function sendWord(roomId){
    try{
    var usersData = IdAndNameStore.get(roomId)
    const userid = usersData.id

    var ran = getRandomNumber(0,userid.length-1)
    io.to(userid[ran]).emit("word",getWords())
    io.to(roomId).emit("isdrawing","Someone is choosing a word wait :)")
    TimeStore.set(roomId,60)
    
    var interval = setInterval(()=>{var time = TimeStore.get(roomId);time-=1;TimeStore.set(roomId,time)},1000)
    // io.to(roomId).emit("Time",time)
    io.to(roomId).emit("Time",TimeStore.get(roomId))
    if(TimeStore.get(roomId)<=0){
        io.to(roomId).emit("Time",TimeStore.get(roomId))
        interval.clear
    }
    io.to(roomId).emit("clear")
    console.log("Word sent!")
    NumCorrectAns.set(roomId,0)
}catch(err){
    console.log("number of users in room were 0 maybe is the error")
    console.log(err)
}
}

const IdAndNameStore = new Map()
var WordChosen = new Map()
var NumCorrectAns = new Map()
var TimeStore = new Map()
const Rooms=[];
const roomDrawings={}

app.use(express.static('public'))
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    // res.render('first',{roomId: req.params.room})
    // res.redirect(`/${uuidV4()}`)
    res.redirect(`/${getRandomNumber(100000,999999)}`)

})
app.get('get-room',(req,res)=>{
    const exchangedData = req.body.exchangedData;

})
app.get('/:room',(req,res)=>{
    // res.render("first")
    res.render('index',{roomId: req.params.room})
    // res.render('first',{roomId: req.params.room})
})

io.on('connection',(socket)=>{


    console.log("a user connected")
    socket.on('joinRoom', (roomId) => {
        

        socket.join(roomId);        
        
        if (roomDrawings[roomId]) {
            io.to(socket.id).emit('loadDrawing',roomDrawings[roomId])
            console.log("sending previous drawing")
        }

        //set the id for now name later when it comes
        if(!IdAndNameStore.has(roomId)){
            IdAndNameStore.set(roomId,{id:[],Name:[]})
        }
        //add the room
        if(!Rooms.includes(roomId)){
            Rooms.push(roomId)
        }
        console.log("Number of room we have are: ",Rooms.length)
        if(!WordChosen.has(roomId)){
            WordChosen.set(roomId,[])
        }
        if(!NumCorrectAns.has(roomId)){
            NumCorrectAns.set(roomId,0)
        }
        if(!TimeStore.has(roomId)){
            TimeStore.set(roomId,0)
        }
        io.to(socket.id).emit("len",WordChosen.get(roomId).length)
        // if(TimeStore.get(roomId)>0){
        io.to(socket.id).emit("Time",TimeStore.get(roomId))
        // }

        var usersData = IdAndNameStore.get(roomId)
        usersData.id.push(socket.id)
        IdAndNameStore.set(roomId,usersData)

        if(usersData.id.length==2){
            sendWord(roomId)
        }
        // io.to(roomId).emit("myid",socket.id)        
        console.log(`User joined room: ${roomId}`);
        console.log(`User joined with id: ${socket.id}`);
        console.log(`user id length is ${usersData.id.length}`)

    });
    socket.on("drawing", (data) => {
        // io.to(data.room).emit('drawing', data);
        socket.broadcast.to(data.room).emit('drawing', data); 
        // const { roomId, coordinates } = data
    });

    // Handle other events (clicked, clear, etc.)
    socket.on("clicked", (data) => {
        io.to(data.room).emit("clicked", data);
        const { xx, yy, pointercolour, room } = data;
        if (!roomDrawings[data.room]) {
            roomDrawings[data.room] = [];
        }
        roomDrawings[data.room].push({ xx: xx, yy: yy, pointercolour: pointercolour });

    });

    socket.on("clear", (data) => {
        io.to(data.room).emit("clear", data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on("msg",(data)=>{

        if(data.usermsg.trim()){
            if(data.usermsg==WordChosen.get(data.room)){
                io.to(data.room).emit("msg", `<strong style="color: green;">${data.myname} Guessed the word !</strong>
`)              
console.log("sahi answer mila")
                io.to(data.room).emit("sound","guessed")

                var inc=NumCorrectAns.get(data.room)
                inc+=1
                NumCorrectAns.set(data.room,inc)
                //it will get number of players to detect how many have answered so can send new word
                var leng = IdAndNameStore.get(data.room).Name
                console.log(NumCorrectAns.get(data.room))
                if(NumCorrectAns.get(data.room)+1==leng.length){
                    sendWord(data.room);
                }
            }else{
                io.to(data.room).emit("msg", data.myname+": "+data.usermsg)
            }
        }

        
        console.log(data.usermsg,)
    })

    socket.on("name",(data)=>{

        //now save the name 
        var usersData = IdAndNameStore.get(data.room)
        usersData.Name.push(data.myname)
        IdAndNameStore.set(data.room,usersData)

        io.to(data.room).emit("name",usersData.Name) 
        io.to(data.room).emit("sound","join")

//emitting guess word
        // io.to(data.room).emit("word",getWords())




    })
    socket.on('left',(data)=>{
        sendWord(data.room)
        var usersData = IdAndNameStore.get(data.room)
        var users = usersData.Name
        var userid = usersData.id
        console.log(users)
        // users = users.filter(name => name !== data.myname);

        if(users.length==0&&userid.length==0){}else{

        const index = userid.indexOf(socket.id)
        if(index !==-1){
            users.splice(index,1)
            userid.splice(index,1)
        }
        usersData.id = userid
        usersData.Name = users
        IdAndNameStore.set(data.room,usersData)
        
        io.to(data.room).emit("name",users) 
        io.to(data.room).emit("sound","left")

        const ind = Rooms.indexOf(data.room)
        if(userid.length<1){
            if(ind!==1){
            Rooms.splice(index, 1);
            }else{
                console.log("Some error came while deleting a room id !")
            }
            console.log("Number of room we have are: ",Rooms.length)

        }
    }
    })
    socket.on("wordchose",(data)=>{
        WordChosen.set(data.room,data.option)
        io.to(data.room).emit("msg",`<strong>${data.myname} is drawing a word!</strong>`)
                console.log("debugging of bug",data.option)

        var len = data.option.length
        console.log(`user is drawing a word ${data.option} of length ${len}`)
        io.to(data.room).emit("len",len)
        io.to(socket.id).emit("directword",data.option)

    })




})

server.listen(port,()=>{
    console.log(`listening at port ${port}`)
})